import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import Filter from "@/components/shared/Filter";
import React from "react";
import Link from "next/link";
import TagCard from "@/components/cards/TagCard";

const TagsPage = async () => {
  const tags = await getAllTags({});
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="flex-1 min-h-[56px]  sm:min-w-[170px]"
        />
      </div>

      {/* Display Users */}
      <section className="mt-12 flex flex-wrap gap-2">
        {tags && tags.tags.length > 0 ? (
          tags?.tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
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

export default TagsPage;
