"use client";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {Comment} from "@/app/models/Comment";
import {CommentDto} from "@/app/models/CommentDto";
import {CreateComment, DeleteComment, GetCommentsByQuestionId} from "@/app/services/CommentService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Button, FormGroup, Input, Label} from "reactstrap";

export default function Page({params}: {params: {id: string}}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  const [userComment, setUserComment] = useState<string>("");
  const [sentComment, setSentComment] = useState<boolean>();

  const context = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await GetCommentsByQuestionId(params.id)
        if (response.error || !response.data) {
          router.replace("/pages/admin/competition");
          return;
        }
        setComments(response.data);

      } catch (e: Error | any) {
        toast.error("Error fetching comments");
      }
    }
    fetchComments();
  }, [sentComment])

  const handleComment = async () => {
    let comment: CommentDto = {
      id: "",
      content: userComment,
      questionId: params.id,
      userId: getWithExpiry("userId") as string
    }
    try {
      setSentComment(true);
      const response = await CreateComment(comment)
      if (response.error || !response.success) {
        setSentComment(false);
        toast.error(response.error);
        return;
      }

      setSentComment(false);
      setUserComment("");

    } catch (e: Error | any) {
      toast.error("Error posting comment");
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setSentComment(true);
      const response = await DeleteComment(id)
      if (response.error || !response.success) {
        toast.error(response.error);
        return;
      }
      toast.success("Comment deleted successfully");
      setSentComment(false);
    }
    catch (e: Error | any) {
      toast.error(e);
      setSentComment(false);
    }
  }

  const handleInputChange = (e: any) => {
    const {value} = e.target;
    setUserComment(value);
  }
  return (
    <div className="h-100 bg-dark ">
      <div className="container py-5 text-white h-100 bg-dark">
        <h1 className="">Comments </h1>
        <div className="d-flex flex-column bg-dark">
          <div className="d-flex flex-column">
            <FormGroup className="col-6">
              <Label for="exampleText">
                Your Comment
              </Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                value={userComment}
                onChange={handleInputChange}
              />
            </FormGroup>

            <Button className="btn-primary text-white align-self-start" disabled={sentComment} onClick={handleComment}>Submit</Button>
          </div>
          <div id="comments section" className="mt-4 d-flex flex-column">
            {comments.map((comment, index) => (
              <div className="d-flex flex-row border border-2 border-grey rounded my-2">
                <Link href={`/pages/profile/${comment.user.userName}`}>
                  <Image
                    src={`data:image/png;base64,${comment.user.profileImage}`}
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-circle align-self-center"
                  ></Image>

                </Link>
                <div className="d-flex flex-column ms-3">
                  <p className="fw-bold m-0 mt-1">@{comment.user.userName}</p>
                  <p className="mt-1">{comment.content}</p>
                </div>
                {(context.roles.includes("Admin" || "Manager") || comment.user.id === getWithExpiry("userId"))
                  && <Button className=" ms-auto btn-danger " onClick={() => handleDelete(comment.id)}>Delete</Button>}
              </div>
            ))}

          </div>


        </div>

      </div>
    </div>
  );
}
