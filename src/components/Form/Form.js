import React, { useState } from "react";

import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    textContent: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("數據已成功提交至數據庫");
      } else {
        console.error("提交數據時出錯");
      }
    } catch (error) {
      console.error("提交數據時出錯", error);
    }
  };

  return (
    <div>
      <h2>React Form</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>姓名：</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="請輸入姓名"
          />
        </div>
        <div>
          <label>Email：</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="請輸入 Email"
          />
        </div>
        <div>
          <label>文字內容：</label>
          <textarea
            name="textContent"
            value={formData.textContent}
            onChange={handleChange}
            rows="4"
            placeholder="請輸入你想傳送給我們的內容"
          />
        </div>
        <div>
          <label>圖片網址：</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="請輸入你的圖片網址"
          />
        </div>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Form;
