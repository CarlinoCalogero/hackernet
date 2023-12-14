import { Comment } from "./comment.models";

export class NestedComment {
    parent!: Comment;
    kids!: NestedComment[]
}