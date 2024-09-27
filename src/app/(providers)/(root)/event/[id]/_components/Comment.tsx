'use client';
import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getCommentsByEventId, updateComment } from '../action';
import useUser from '@/hooks/useUser';

type CommentType = {
  comment_event_id: string;
  comment_id: string;
  comment_user_id: string;
  created_at: string;
  description: string;
  User?: {
    user_name: string;
  } | null;
};

type CommentProps = {
  eventId: string;
};

export default function Comment({ eventId }: CommentProps) {
  const user = useUser();
  const userId = user?.user?.id || '';

  const [comments, setComments] = useState<CommentType[]>([]);
  const [description, setDescription] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState<string>('');

  // 댓글을 가져오는 함수
  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsByEventId(eventId);
      if ('error' in fetchedComments) {
        console.error('댓글을 가져오는 데 문제가 발생했습니다:', fetchedComments.message);
      } else {
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [eventId]);

  // 댓글 추가 함수
  const handleAddComment = async () => {
    if (description.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newComment = await addComment(eventId, userId, description);
      if (newComment && newComment.length > 0) {
        const commentsWithUser = newComment.map((comment) => ({
          ...comment,
          User: { user_name: user?.user?.user_name || '익명' } // user_name을 직접 사용
        }));
        setComments((prevComments) => [...prevComments, ...commentsWithUser]);
        setDescription('');
      } else {
        alert('댓글 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 등록 중 오류가 발생했습니다:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId: string): Promise<void> => {
    const confirmDelete = confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  // 댓글 수정 시작 함수
  const startEditingComment = (comment: CommentType) => {
    setEditingCommentId(comment.comment_id);
    setEditDescription(comment.description);
  };

  // 댓글 수정 함수
  const handleUpdateComment = async () => {
    if (!editingCommentId || editDescription.trim() === '') return;

    try {
      const updatedComment = await updateComment(editingCommentId, editDescription);
      if (updatedComment) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.comment_id === editingCommentId
              ? { ...comment, description: editDescription, User: comment.User }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditDescription('');
      } else {
        alert('댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-[1240px] flex-col justify-start items-start gap-12 inline-flex">
      <div className="self-stretch h-[47px] flex-col justify-start items-start gap-5 flex">
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="text-center text-[#111111] text-lg font-normal leading-relaxed">댓글</div>
          <div className="text-center text-[#111111] text-lg font-normal leading-relaxed">
            {comments.length}
          </div>
        </div>
        <div className="self-stretch h-px bg-[#e5e5ec]" />
      </div>

      <div className="self-stretch h-[261px] flex-col justify-start items-start gap-10 flex">
        <div className="self-stretch h-[220px] flex-col justify-start items-start gap-5 flex">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="self-stretch h-40 p-5 bg-white border-2 border-[#e5e5ec]"
            placeholder="댓글을 남겨주세요"
          />
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="text-[#111111] text-sm font-normal leading-tight"></div>
            <div
              onClick={handleAddComment}
              className="px-3 py-[9px] bg-[#3bb873] rounded justify-center items-center gap-2.5 flex cursor-pointer"
            >
              <div className="text-center text-white text-[13px] font-normal leading-[18px]">
                댓글 남기기
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-[#e5e5ec]" />
      </div>

      <div className="h-[1024px] flex-col justify-start items-end inline-flex">
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div
              key={comment.comment_id}
              className="w-[1240px] h-[204px] py-10 border-b border-[#e5e5ec] flex gap-10"
            >
              <div className="w-[25px] text-center text-[#111111] text-[13px] font-semibold leading-[18px]">
                {index + 1}
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-6">
                <div className="self-stretch text-[#111111] text-[13px] font-normal leading-[18px]">
                  작성자: {comment.User?.user_name}
                </div>
                {editingCommentId === comment.comment_id ? (
                  <div className="self-stretch h-[82px] flex-col justify-start items-start gap-5 flex">
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="self-stretch p-2 border"
                    />
                    <div className="justify-end items-start gap-7 flex ml-auto justify-end">
                      <button
                        onClick={handleUpdateComment}
                        className="text-[#555555] text-[13px] font-semibold leading-[18px] cursor-pointer"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="text-[#eb003b] text-[13px] font-semibold leading-[18px] cursor-pointer"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="self-stretch h-[82px] flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch text-[#111111] text-[15px] font-normal leading-snug">
                      {comment.description}
                    </div>
                    <div className="self-stretch justify-between items-start gap-9 inline-flex">
                      <div className="text-[#111111] text-[13px] font-normal leading-[18px]">
                        {new Date(comment.created_at).toLocaleString()}
                      </div>
                      {comment.comment_user_id === userId && (
                        <div className="ml-auto justify-end items-start gap-7 flex">
                          <div
                            onClick={() => startEditingComment(comment)}
                            className="text-[#555555] text-[13px] font-semibold leading-[18px] cursor-pointer"
                          >
                            수정
                          </div>
                          <div
                            onClick={() => handleDeleteComment(comment.comment_id)}
                            className="text-[#eb003b] text-[13px] font-semibold leading-[18px] cursor-pointer"
                          >
                            삭제
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
