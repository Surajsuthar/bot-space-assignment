import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button, TextField } from "@mui/material";
import { useState, useRef } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ChevronLeft, Heart, Send, Phone } from "lucide-react";
import { Input } from "@mui/material";

function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showThirdStep, setShowThirdStep] = useState(false);
  const fileInputRef = useRef(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(
    `Hey there! I'm so happy you're here, thanks so much for your interest 😊
Click below and I'll send you the link in just a sec ✨`
  );
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [secondMessage, setSecondMessage] = useState("");

  const defaultImages = ["./body.png", "./cat.png", "./flower.png"];
  const allImages = [...defaultImages, ...uploadedImages];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (e.target.value.trim()) {
      setShowComments(true);
      setComments([
        {
          id: 1,
          username: "Username",
          text: e.target.value,
          time: "Now",
          liked: false,
        },
      ]);
    } else {
      setShowComments(false);
      setComments([]);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        username: "You",
        text: newComment,
        time: "Now",
        liked: false,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const toggleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, liked: !comment.liked }
          : comment
      )
    );
  };

  return (
    <main className="min-h-screen w-full">
      <section className="flex w-full min-h-screen">
        {/* Sidebar */}
        <aside className="w-1/4 min-h-full p-2 bg-white overflow-y-auto">
          <div className="h-full flex flex-col rounded-lg space-y-4 p-4">
            {/* First Step */}
            <FormControl className="flex flex-col gap-2">
              <label className="text-black font-black">
                When someone comments on a post
              </label>
              <RadioGroup
                defaultValue="post"
                name="radio-buttons-group"
                className="w-full rounded-xl bg-gray-100 p-2"
              >
                <FormControlLabel
                  value="post"
                  control={<Radio size="small" />}
                  label="A specific post or reel"
                />
                <div className="flex gap-2 items-center justify-start flex-wrap">
                  {allImages.map((imageUrl, index) => (
                    <img
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      src={imageUrl}
                      className={`object-cover h-[100px] w-[75px] rounded-lg cursor-pointer ${
                        selectedImageIndex === index
                          ? "border-2 border-purple-700"
                          : "border border-gray-200"
                      }`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  ))}
                  <div
                    onClick={handleUploadClick}
                    className="h-[100px] w-[75px] border-2 border-dashed border-gray-400 rounded-lg cursor-pointer flex items-center justify-center hover:border-purple-500 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-500 text-2xl">+</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </RadioGroup>
            </FormControl>

            {/* Second Step */}
            {showSecondStep && (
              <FormControl className="flex flex-col gap-2 mt-2">
                <label className="text-black mt-2 font-black">
                  And this comment has
                </label>
                <RadioGroup
                  defaultValue="specific"
                  name="word-filter-group"
                  className="w-full rounded-xl bg-gray-100 p-2"
                >
                  <FormControlLabel
                    value="specific"
                    control={<Radio size="small" />}
                    label="a specific word or words"
                  />
                  <div className="flex flex-col gap-2">
                    <Input
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Enter a word or multiple"
                      className="mt-2 px-2 py-1 w-full rounded border border-gray-300 text-sm"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            )}

            {/* Third Step */}
            {showThirdStep && (
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-black mt-2 font-black">
                  They will get
                </label>
                <div className=" bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <div className="text-sm text-gray-700 mb-3"></div>
                  <Input
                    value={" Send me the link"}
                    className="w-full border"
                  />
                  <div className="mt-3 text-xs text-blue-600 cursor-pointer hover:underline">
                    📄 Why does an opening DM matter?
                  </div>
                </div>
                <div className=" bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className=" p-1">
                    a DM with Link
                  </label>
                  <Input
                    placeholder="Write a message"
                    value={secondMessage}
                    className="w-full h-10 p-2 border border-gray-300 rounded text-sm resize-none"
                    onChange={(e) => setSecondMessage(e.target.value)}
                  />
                  <div className="mt-2 text-center">
                    <button className="bg-gray-200 w-full px-4 py-2 rounded text-sm hover:bg-gray-300 transition-colors">
                      ➕ Add A Link
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Button
              variant="outlined"
              className="text-black w-2.5"
              onClick={() => {
                if (!showSecondStep) {
                  setShowSecondStep(true);
                } else if (!showThirdStep) {
                  setShowThirdStep(true);
                }
              }}
            >
              Next
            </Button>
          </div>
        </aside>

        {/* Phone Preview */}
        <section className="w-3/4 p-4 flex items-center justify-center bg-gray-100">
          <div className="relative">
            <div className="w-80 h-[650px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Show DM interface when third step is active */}
                {showThirdStep ? (
                  <div className="w-full h-full bg-black text-white flex flex-col">
                    {/* DM Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <ChevronLeft className="text-white" size={20} />
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="text-white font-medium">botspacehq</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={20} className="text-white" />
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M23 7L16 12L23 17V7Z" fill="currentColor"/>
                          <rect x="1" y="5" width="15" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                    </div>

                    {/* DM Messages */}
                    <div className="flex-1 p-4 flex flex-col gap-3">
                      {/* Bot Message */}
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[200px]">
                          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                            {message}
                          </p>
                          <div className="mt-2 bg-gray-700 rounded-xl p-2 text-center">
                            <span className="text-white text-sm">Send me the link</span>
                          </div>
                        </div>
                      </div>

                      {/* User Response */}
                      <div className="flex justify-end">
                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 max-w-[200px]">
                          <p className="text-white text-sm">Send me the link</p>
                        </div>
                      </div>

                      {/* Second Bot Message */}
                      {secondMessage && (
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">B</span>
                          </div>
                          <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[200px]">
                            <p className="text-white text-sm leading-relaxed">
                              {secondMessage}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* DM Input */}
                    <div className="p-4 border-t border-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">📷</span>
                        </div>
                        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-gray-400 text-sm">
                          Message...
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🖼️</span>
                          <span className="text-2xl">🎤</span>
                          <span className="text-2xl">➕</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Original Instagram Post UI */}
                    {/* Top Header */}
                    <div className="absolute top-0 w-full bg-black z-10 rounded-t-[2.5rem]">
                      <div className="flex justify-center py-1">
                        <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
                      </div>

                      <div className="flex items-center justify-between px-4 py-2">
                        <ChevronLeft className="text-white" size={20} />
                        <div className="text-center flex-1 -ml-4">
                          <p className="text-xs text-gray-400 font-medium">
                            BOTSPACEHQ
                          </p>
                          <p className="text-white text-base font-semibold -mt-1">
                            Posts
                          </p>
                        </div>
                        <div className="w-5" />
                      </div>

                      <div className="flex items-center px-4 py-2 gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-black text-xs font-bold">+</span>
                        </div>
                        <p className="text-white text-sm font-medium">botspacehq</p>
                        <div className="ml-auto text-white text-xl font-bold">
                          ⋯
                        </div>
                      </div>
                    </div>

                    {/* Phone Body */}
                    <div className="pt-12 flex flex-col h-full">
                      {!showComments ? (
                        // Show full image when no comments
                        <div className="flex-1 overflow-hidden flex items-center justify-center">
                          {allImages[selectedImageIndex] && (
                            <img
                              src={allImages[selectedImageIndex]}
                              alt="Selected"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ) : (
                        // Show image with comments overlay
                        <>
                          <div className="flex-1 overflow-hidden flex items-center justify-center relative">
                            {allImages[selectedImageIndex] && (
                              <img
                                src={allImages[selectedImageIndex]}
                                alt="Selected"
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute bottom-0 rounded-t-xl left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm">
                              <div className="flex items-center justify-between p-4 border-b border-gray-600">
                                <div className="h-[1px] bg-white"></div>
                                <h3 className="text-white font-semibold">
                                  Comments
                                </h3>
                                <div className="text-white">
                                  <Send size={16} />
                                </div>
                              </div>

                              {/* Comments List */}
                              <div className="h-70 overflow-y-auto">
                                {comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className="flex items-start gap-3 p-3 border-gray-700"
                                  >
                                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">
                                        {comment.username[0].toUpperCase()}
                                      </span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-white font-medium text-sm">
                                          {comment.username}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                          {comment.time}
                                        </span>
                                      </div>
                                      <p className="text-gray-300 text-sm mt-1">
                                        {comment.text}
                                      </p>
                                      <button className="text-gray-400 text-xs mt-1 hover:text-white">
                                        Reply
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => toggleLike(comment.id)}
                                      className={`p-1 ${
                                        comment.liked
                                          ? "text-red-500"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      <Heart
                                        size={16}
                                        fill={
                                          comment.liked ? "currentColor" : "none"
                                        }
                                      />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between items-end p-2">
                                {[
                                  "❤️",
                                  "🙌",
                                  "🔥",
                                  "👏",
                                  "😢",
                                  "😍",
                                  "😮",
                                  "😂",
                                ].map((emoji, index) => (
                                  <button
                                    key={index}
                                    className="text-xl hover:scale-110 transition-transform"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                              {/* Add Comment */}
                              <div className="flex items-center gap-2 p-3">
                                <div className="w-8 h-8 bg-gray-600/30 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    +
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  placeholder="Add a comment for username..."
                                  className="flex-1 bg-transparent text-white w-full text-sm border border-gray-600/40 p-2.5 rounded-2xl placeholder-gray-400 focus:outline-none"
                                />
                                <button
                                  onClick={handleAddComment}
                                  className="text-blue-400 p-1 hover:text-blue-300"
                                ></button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {!showComments && (
                        <div className="h-[80px] bg-black p-2 w-full flex items-start justify-around text-white">
                          <HomeOutlinedIcon fontSize="small" />
                          <SearchIcon fontSize="small" />
                          <SmartDisplayIcon fontSize="small" />
                          <ShoppingBagOutlinedIcon fontSize="small" />
                          <AccountCircleOutlinedIcon fontSize="small" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;