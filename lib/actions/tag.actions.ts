"use server";

import User from "@/database/user.model";
import Tag, { Itag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedtags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found.");

    // Find ineractions for the user and group by tags

    return [
      {
        _id: "1",
        name: "tag1",
      },
      {
        _id: "1",
        name: "tag2",
      },
      {
        _id: "1",
        name: "tag3",
      },
    ];
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    if (!tags) throw new Error("User not found.");

    // Find ineractions for the user and group by tags

    return { tags };
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<Itag> = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {};

    const tag = await Tag.findOne({ tagFilter }).populate({
      path: "questions",
      model: Question,
      match: searchQuery,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) throw new Error("Tag Not Found");

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
  }
}
