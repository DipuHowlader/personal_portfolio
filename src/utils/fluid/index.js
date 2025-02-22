import React, { useEffect, useRef, useMemo } from 'react';
import styles from './fluid.module.css';

const FluidAnimation = () => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);

  const {
    canvas_width,
    canvas_height,
    resolution,
    pen_size,
    num_cols,
    num_rows,
    speck_count
  } = useMemo(() => ({
    canvas_width: 1300,
    canvas_height: 800,
    resolution: 20,
    pen_size: 40,
    num_cols: Math.floor(1300 / 20),
    num_rows: Math.floor(800 / 20),
    speck_count: 5000
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const offscreenCanvas = offscreenCanvasRef.current;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    let mouse = {
      x: 0,
      y: 0,
      px: 0,
      py: 0,
      down: false,
    };

    let vec_cells = [];
    let particles = [];

    function cell(x, y, res) {
      this.x = x;
      this.y = y;
      this.r = res;
      this.col = 0;
      this.row = 0;
      this.xv = 0;
      this.yv = 0;
      this.pressure = 0;
    }

    function particle(x, y) {
      this.x = this.px = x;
      this.y = this.py = y;
      this.xv = this.yv = 0;
    }

    function init() {
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      offscreenCanvas.width = canvas_width;
      offscreenCanvas.height = canvas_height;

      particles = Array.from({ length: speck_count }, () => 
        new particle(Math.random() * canvas_width, Math.random() * canvas_height)
      );

      vec_cells = Array.from({ length: num_cols }, (_, col) => 
        Array.from({ length: num_rows }, (_, row) => {
          const cell_data = new cell(col * resolution, row * resolution, resolution);
          cell_data.col = col;
          cell_data.row = row;
          return cell_data;
        })
      );

      // Connect neighboring cells
      for (let col = 0; col < num_cols; col++) {
        for (let row = 0; row < num_rows; row++) {
          const cell_data = vec_cells[col][row];
          const row_up = row - 1 >= 0 ? row - 1 : num_rows - 1;
          const col_left = col - 1 >= 0 ? col - 1 : num_cols - 1;
          const col_right = col + 1 < num_cols ? col + 1 : 0;

          cell_data.up = vec_cells[col][row_up];
          cell_data.left = vec_cells[col_left][row];
          cell_data.up_left = vec_cells[col_left][row_up];
          cell_data.up_right = vec_cells[col_right][row_up];
          
          vec_cells[col][row_up].down = cell_data;
          vec_cells[col_left][row].right = cell_data;
          vec_cells[col_left][row_up].down_right = cell_data;
          vec_cells[col_right][row_up].down_left = cell_data;
        }
      }

      draw();
    }

    function update_particle() {
      offscreenCtx.clearRect(0, 0, canvas_width, canvas_height);
      offscreenCtx.beginPath();
      
      particles.forEach(p => {
        if (p.x >= 0 && p.x < canvas_width && p.y >= 0 && p.y < canvas_height) {
          const col = Math.floor(p.x / resolution);
          const row = Math.floor(p.y / resolution);
          const cell_data = vec_cells[col][row];
          const ax = (p.x % resolution) / resolution;
          const ay = (p.y % resolution) / resolution;
          
          p.xv += ((1 - ax) * cell_data.xv + ax * cell_data.right.xv + ay * cell_data.down.xv) * 0.05;
          p.yv += ((1 - ay) * cell_data.yv + ax * cell_data.right.yv + ay * cell_data.down.yv) * 0.05;
          
          p.x += p.xv;
          p.y += p.yv;
          
          offscreenCtx.moveTo(p.x, p.y);
          offscreenCtx.lineTo(p.px, p.py);
          
          p.px = p.x;
          p.py = p.y;
        } else {
          p.x = p.px = Math.random() * canvas_width;
          p.y = p.py = Math.random() * canvas_height;
          p.xv = p.yv = 0;
        }
        p.xv *= 0.5;
        p.yv *= 0.5;
      });

      offscreenCtx.stroke();
    }

    function draw() {
      const mouse_xv = mouse.x - mouse.px;
      const mouse_yv = mouse.y - mouse.py;
      
      vec_cells.forEach(cell_datas => {
        cell_datas.forEach(cell_data => {
          if (mouse.down) {
            change_cell_velocity(cell_data, mouse_xv, mouse_yv, pen_size);
          }
          update_pressure(cell_data);
        });
      });
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "var(--text-color)";
      
      update_particle();
      ctx.drawImage(offscreenCanvas, 0, 0);
      
      vec_cells.forEach(cell_datas => {
        cell_datas.forEach(update_velocity);
      });
      
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      
      requestAnimationFrame(draw);
    }

    function change_cell_velocity(cell_data, mvelX, mvelY, pen_size) {
      const dx = cell_data.x - mouse.x;
      const dy = cell_data.y - mouse.y;
      let dist = Math.sqrt(dy * dy + dx * dx);
      
      if (dist < pen_size) {
        if (dist < 4) {
          dist = pen_size;
        }
        
        const power = pen_size / dist;
        cell_data.xv += mvelX * power;
        cell_data.yv += mvelY * power;
      }
    }

    function update_pressure(cell_data) {
      const pressure_x =
        cell_data.up_left.xv * 0.5 +
        cell_data.left.xv +
        cell_data.down_left.xv * 0.5 -
        cell_data.up_right.xv * 0.5 -
        cell_data.right.xv -
        cell_data.down_right.xv * 0.5;
      
      const pressure_y =
        cell_data.up_left.yv * 0.5 +
        cell_data.up.yv +
        cell_data.up_right.yv * 0.5 -
        cell_data.down_left.yv * 0.5 -
        cell_data.down.yv -
        cell_data.down_right.yv * 0.5;
      
      cell_data.pressure = (pressure_x + pressure_y) * 0.25;
    }

    function update_velocity(cell_data) {
      cell_data.xv += (
        cell_data.up_left.pressure * 0.5 +
        cell_data.left.pressure +
        cell_data.down_left.pressure * 0.5 -
        cell_data.up_right.pressure * 0.5 -
        cell_data.right.pressure -
        cell_data.down_right.pressure * 0.5
      ) * 0.25;
      
      cell_data.yv += (
        cell_data.up_left.pressure * 0.5 +
        cell_data.up.pressure +
        cell_data.up_right.pressure * 0.5 -
        cell_data.down_left.pressure * 0.5 -
        cell_data.down.pressure -
        cell_data.down_right.pressure * 0.5
      ) * 0.25;
      
      cell_data.xv *= 0.99;
      cell_data.yv *= 0.99;
    }

    function mouse_down_handler(e) {
      e.preventDefault();
      mouse.down = true;
    }

    function mouse_up_handler() {
      mouse.down = false;
    }

    function touch_start_handler(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.x = mouse.px = e.touches[0].pageX - rect.left;
      mouse.y = mouse.py = e.touches[0].pageY - rect.top;
      mouse.down = true;
    }

    function touch_end_handler(e) {
      if (!e.touches) mouse.down = false;
    }

    function mouse_move_handler(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function touch_move_handler(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.touches[0].pageX - rect.left;
      mouse.y = e.touches[0].pageY - rect.top;
    }

    window.addEventListener('mousedown', mouse_down_handler);
    window.addEventListener('mouseup', mouse_up_handler);
    window.addEventListener('touchstart', touch_start_handler);
    window.addEventListener('touchend', touch_end_handler);
    canvas.addEventListener('mousemove', mouse_move_handler);
    canvas.addEventListener('touchmove', touch_move_handler);

    init();

    return () => {
      window.removeEventListener('mousedown', mouse_down_handler);
      window.removeEventListener('mouseup', mouse_up_handler);
      window.removeEventListener('touchstart', touch_start_handler);
      window.removeEventListener('touchend', touch_end_handler);
      canvas.removeEventListener('mousemove', mouse_move_handler);
      canvas.removeEventListener('touchmove', touch_move_handler);
    };
  }, [canvas_width, canvas_height, resolution, pen_size, num_cols, num_rows, speck_count]);

  return (
    <div className={styles.fluid}>
      <canvas id={styles.c} ref={canvasRef} />
      <canvas ref={offscreenCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default FluidAnimation;
