'use client';

import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FORMATS } from '../_utils/constants';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

const DynamicReactQuill = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');
    const ForwardedComponent = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <ReactQuill ref={forwardedRef} {...props} />
    );
    ForwardedComponent.displayName = 'ForwardedComponent';
    return ForwardedComponent;
  },
  { ssr: false, loading: () => <p>Loading ...</p> }
);

function QuillEditor() {
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'underline', 'blockquote', 'link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }, { color: [] }, { background: [] }]
        ]
        // handlers: {
        //   image: () => handleImage(quillRef)
        // }
      }
    }),
    []
  );
  return (
    <>
      <DynamicReactQuill
        forwardedRef={quillRef}
        theme="snow"
        modules={modules}
        formats={FORMATS}
        placeholder="등록할 상품의 상세내용을 작성해주세요."
        className="h-[500px] border-[#f0f0f0]"
      />
    </>
  );
}

export default QuillEditor;
