import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, fetchPost, updatePost } from '../services/mockApi';
import '../style.css';

function CreateEditPost() {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [header, setHeader] = useState('');
  const [paragraphs, setParagraphs] = useState(['']);
  const [footer, setFooter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getPostData(id) {
      const blogData = await fetchPost(id);
      setHeader(blogData.header);
      setFooter(blogData.footer);
      setParagraphs(blogData.paragraphs);
    }
    if (id) {
      setIsEditMode(true);
      getPostData(id);
    }
  }, [id]);

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const handleDeleteParagraph = () => {
    if (paragraphs.length > 1) {
      const updatedParagraphs = [...paragraphs];
      updatedParagraphs.pop();
      setParagraphs(updatedParagraphs);
    }
  };

  const handleParagraphChange = (index, text) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = text;
    setParagraphs(updatedParagraphs);
  };

  const handleSave = async () => {
    if (!header || paragraphs.some((p) => !p) || !footer) {
      alert('Please fill all fields.');
      return;
    }
    const postData = {
      header,
      paragraphs,
      footer,
    };

    try {
      if (isEditMode) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      setHeader('');
      setParagraphs(['']);
      setFooter('');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container"> 
      <h1>Create Blog Post</h1>
      <input
        className="header-input" 
        type="text"
        placeholder="Header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />
      {paragraphs.map((paragraph, index) => (
        <div className="paragraph-container" key={index}>
          <textarea
            className="paragraph-textarea" 
            placeholder={`Paragraph ${index + 1}`}
            value={paragraph}
            onChange={(e) => handleParagraphChange(index, e.target.value)}
          />
          {index === paragraphs.length - 1 && paragraphs.length > 1 && (
            <button
              className="paragraph-delete-button" 
              onClick={handleDeleteParagraph}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <button className="save-button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>
      <input
        className="footer-input" 
        type="text"
        placeholder="Footer"
        value={footer}
        onChange={(e) => setFooter(e.target.value)}
      />
      <button className="save-button" onClick={handleSave}>
        {isEditMode ? 'Update' : 'Save'}
      </button>
    </div>
  );
}

export default CreateEditPost;
