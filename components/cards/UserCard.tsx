import { getTopInteractedtags } from "@/lib/actions/tag.actions";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "../shared/RenderTags";

interface UserProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: UserProps) => {
  const interactedTags = await getTopInteractedtags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="max-sx:min-w-full w-full rounded-lg shadow-sm dark:shadow-none xs:w-[325px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          width={100}
          height={100}
          alt={user.name}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {interactedTags && interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags Yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
