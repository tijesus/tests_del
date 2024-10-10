import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill theme
import 'highlight.js/styles/monokai.css'; // Code syntax highlighting theme
import hljs from 'highlight.js'; // Highlight.js for syntax highlighting
import axios from 'axios';
import './CreatePost.css'; // Custom CSS

// Initialize Highlight.js for Quill
hljs.configure({
  languages: ['javascript', 'python', 'html', 'css'], // Add any languages you need
});

// Font whitelist for the toolbar (common fonts on user systems)
const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['serif', 'sans-serif', 'monospace', 'courier', 'arial', 'times-new-roman', 'georgia']; // Whitelist fonts
ReactQuill.Quill.register(Font, true);

const modules = {
  toolbar: {
    container: [
      [{ 'header': '1', 'data-tooltip': 'Header 1' }, { 'header': '2', 'data-tooltip': 'Header 2' }, { 'font': [], 'data-tooltip': 'Font' }],
      [{ 'align': [], 'data-tooltip': 'Align' }],
      ['bold', 'italic', 'underline', 'strike'].map((item) => ({
        [item]: true,
        'data-tooltip': item.charAt(0).toUpperCase() + item.slice(1),
      })),
      [{ 'color': [], 'data-tooltip': 'Text Color' }, { 'background': [], 'data-tooltip': 'Background Color' }],
      ['blockquote', 'code-block'].map((item) => ({
        [item]: true,
        'data-tooltip': item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' '),
      })),
      [{ 'list': 'ordered', 'data-tooltip': 'Ordered List' }, { 'list': 'bullet', 'data-tooltip': 'Bullet List' }],
      ['link', 'image'].map((item) => ({
        [item]: true,
        'data-tooltip': item.charAt(0).toUpperCase() + item.slice(1),
      })),
      ['clean'].map(() => ({
        'clean': true,
        'data-tooltip': 'Clear Formatting',
      })),
    ],
  },
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value, // Syntax highlighting
  },
};

const formats = [
  'header', 'font', 'align', 'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'blockquote', 'code-block', 'list', 'bullet',
  'link', 'image',
];

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const quillRef = useRef(null); // Ref for ReactQuill

  // Image upload handler with 5MB limit
  const imageHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      // Check if file exists and is below 5MB
      if (file && file.size <= 5 * 1024 * 1024) { // 5MB size limit
        try {
          const formData = new FormData();
          formData.append('file', file);

          // Send the image to the server
          const response = await axios.post('http://your-api-url/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const imageUrl = response.data.fileUrl; // Get URL from response

          // Insert image into the editor
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          if (range) {
            quill?.insertEmbed(range.index, 'image', imageUrl);
          }
        } catch (error) {
          console.error('Image upload failed:', error);
          setError('Failed to upload image.');
        }
      } else {
        setError('Image size exceeds 5MB.');
      }
    };
  }, []);

  // Set the custom image handler in Quill after mount
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.getModule('toolbar').addHandler('image', imageHandler);
    }
  }, [imageHandler]);

  // Form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user.username) {
      console.error('User is not logged in or user data is not available.');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      author: user.username,
      authorPic: user.profilePic,
      published_date: new Date().toLocaleString(),
    };

    console.log('New Post:', newPost);
    setTitle('');
    setContent('');
  };

  // Highlight code after content change
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.ql-syntax');
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block); // Ensure code highlighting works
    });
  }, [content]);

  return (
    <div className="create-post-page">
      <h1>Create a New Post</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="Write your post content..."
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
