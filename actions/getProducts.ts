import prisma from "../libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    let searchKeywords: string[] = [];

    if (searchTerm) {
      // Split the search term into individual words
      searchKeywords = searchTerm.split(" ");
    }
    const products = await prisma.product.findMany({
      where: {
        ...query,
        AND: searchKeywords.map((keyword) => ({
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        })),
      },
      include: {
        reviews: { include: { user: true }, orderBy: { createdAt: "desc" } },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
