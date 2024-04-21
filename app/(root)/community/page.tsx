import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import UserCard from "@/components/cards/UserCard";

const fetchData = async () => {
  try {
    const result = await getAllUsers({});

    return result;
    // Process result
  } catch (error) {
    console.error("Error fetching Users:", error);
    // Handle error (e.g., display error message)
  }
};

const CommunityPage = async () => {
  const result = await fetchData();

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="flex-1 min-h-[56px]  sm:min-w-[170px]"
        />
      </div>

      {/* Display Users */}
      <section className="mt-12 flex flex-wrap gap-4">
        {result && result.users.length > 0 ? (
          result?.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users Found.</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first.
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default CommunityPage;
