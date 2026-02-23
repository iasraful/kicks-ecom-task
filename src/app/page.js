import CategoryPage from "./catagory/page";
import Hero from "./components/Hero";
import NewDrop from "./components/NewDrop-";
import Reviews from "./components/Reviews";

export default function Home() {
  return (
    <div>
      <Hero />
      <NewDrop />
      <CategoryPage />
      <Reviews />
    </div>
  );
}
