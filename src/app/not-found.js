import { Suspense } from "react";
import Preloader from "@/utils/preloader/preloader";
import NotFound from "@/components/notFound";


export const metadata = {
  title: "Dipu | Page Not Found",
  description: "The page you're looking for cannot be found.",
};

export const viewport = {
  colorScheme: "dark light",
};

const NotFoundPage = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <NotFound />
    </Suspense>

  );
};

export default NotFoundPage;