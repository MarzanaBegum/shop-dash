"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "../../../utils/Categories";
import Container from "../Container";
import Category from "./Category";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  if (!isMainPage) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
