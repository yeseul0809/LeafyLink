'use client';
import { useEffect, useState } from 'react';
import { addComment, deleteComment, getCommentsByEventId } from '../action';
import useUser from '@/hooks/useUser';

type CommentType = {
  comment_event_id: string;
  comment_id: string;
  comment_user_id: string;
  created_at: string;
  description: string;
};

type CommentProps = {
  eventId: string;
};
export default function Comment({ eventId }: CommentProps) {
  const user = useUser();
  const userId = user?.user?.id || '';
  const [comments, setComments] = useState<CommentType[]>([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsByEventId(eventId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [eventId]);

  // 댓글 추가
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
        setComments((prevComments) => [...prevComments, ...newComment]);
        setDescription('');
      } else {
        alert('댓글 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 등록 중 오류가 발생했습니다:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string): Promise<void> => {
    const confirmDelete = confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deleteComment(commentId);

      // 요청이 성공하면 상태 업데이트
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <div>
        <div className="w-[1240px] h-[356px] flex-col justify-start items-start gap-12 inline-flex">
          <div className="self-stretch h-[47px] flex-col justify-start items-start gap-5 flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="text-center text-[#111111] text-lg font-normal  leading-relaxed">
                댓글
              </div>
              <div className="text-center text-[#111111] text-lg font-normal  leading-relaxed">
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
                className="self-stretch h-40 p-5 bg-white border-2 border-[#e5e5ec] justify-start items-start gap-2 inline-flex"
                placeholder="댓글을 남겨주세요"
              />
              <div className="self-stretch justify-between items-start inline-flex">
                <div className="text-[#111111] text-sm font-normal  leading-tight">
                  상품과 관련없는 내용 또는 이미지, 욕설/비방, 개인정보유출, 광고/홍보글 등 적절하지
                  않은 게시물은 별도의 고지없이 비공개 처리 될 수 있습니다.
                  <br />
                  작성된 게시물은 운영 및 마케팅에 활용될 수 있습니다.
                </div>
                <div
                  onClick={handleAddComment}
                  className="px-3 py-[9px] bg-[#3bb873] rounded justify-center items-center gap-2.5 flex cursor-pointer"
                >
                  <div className="justify-center items-center gap-0.5 flex">
                    <div className="text-center text-white text-[13px] font-normal  leading-[18px]">
                      댓글 남기기
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-[#e5e5ec]" />
          </div>
        </div>
      </div>

      <div className="h-[1024px] flex-col justify-start items-end inline-flex">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={comment.comment_id}
              className="w-[1240px] h-[204px] py-10 border-b border-[#e5e5ec] justify-start items-center gap-10 inline-flex"
            >
              <div className="w-[25px] text-center text-[#111111] text-[13px] font-semibold  leading-[18px]">
                {index + 1}
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
                <div className="self-stretch text-[#111111] text-[13px] font-normal  leading-[18px]">
                  작성자 이름: {comment.User?.user_name}
                </div>
                <div className="self-stretch h-[82px] flex-col justify-start items-start gap-5 flex">
                  <div className="self-stretch h-11 flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch text-[#111111] text-[15px] font-normal  leading-snug">
                      {comment.description}
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-start gap-9 inline-flex">
                    <div className="grow shrink basis-0 text-[#111111] text-[13px] font-normal  leading-[18px]">
                      {new Date(comment.created_at).toLocaleString()}
                    </div>
                    {comment.comment_user_id === userId && (
                      <div className="justify-end items-start gap-7 flex">
                        <div className="text-[#555555] text-[13px] font-semibold leading-[18px] cursor-pointer">
                          수정
                        </div>
                        <div
                          className="text-[#eb003b] text-[13px] font-semibold leading-[18px] cursor-pointer"
                          onClick={() => handleDeleteComment(comment.comment_id)}
                        >
                          삭제
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#555555] text-center py-4">댓글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
