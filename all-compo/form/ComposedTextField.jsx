import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, Checkbox, Select, MenuItem, Button, Typography } from '@mui/material';

export default function ComposedTextField() {
  const [showPassword, setShowPassword] = useState(false); // showpassword state
  const [checked, setChecked] = useState(false); // checkbox state
  const [age, setAge] = useState(''); // gender state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    terms: ''
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };//(2)

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => { //এটা দিয়ে checkbox কে handle করা হয়েছে।
    setChecked(event.target.checked);//checkbox থেকে value নিয়ে setChecked state এ সেট করা হয়েছে
    if (event.target.checked) {//এখানে event.target.checked হচ্ছে checkbox এর বর্তমান চেকড স্টেট (যদি চেকড থাকে, তাহলে এটি true হবে, অন্যথায় false হবে)।
      setErrors((prev) => ({ ...prev, terms: '' }));//(4)
    }
  };

  const handleChangeForGender = (event) => {
    setAge(event.target.value);
    setErrors((prev) => ({ ...prev, age: '' }));//(4)
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.trim()) {
      setErrors((prev) => ({ ...prev, name: '' }));//(4)
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value.trim()) {
      setErrors((prev) => ({ ...prev, email: '' }));//(4)
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length >= 8) {
      setErrors((prev) => ({ ...prev, password: '' }));//(4)
    }
  };

  const validateForm = () => {
    let isValid = true;//একটি ফ্ল্যাগ যা ধরে নেয় আপাতত যে ফর্মটি সঠিক (ভ্যালিড)। নিচে দি কোনো ভ্যালিডেশন ব্যর্থ হয়, এটি false সেট করা হবে।
    let newErrors = { name: '', email: '', age: '', password: '', terms: '' };

    if (!name.trim()) { //চেক করে যে name ফিল্ড খালি কিনা। name.trim(): এটি name থেকে শুরুর এবং শেষের ফাঁকা স্পেস মুছে ফেলে। 
      newErrors.name = 'Name is required';//যদি name খালি হয় newErrors.name-এ মেসেজ সেট করে: "Name is required"।
      isValid = false;//isValid-কে false করে দেয়, কারণ ফর্ম সঠিক নয়।
    }
    if (!email.trim()) {//সেইম
      newErrors.email = 'Email is required';//সেইম
      isValid = false;//সেইম
    }
    if (!age) {//সেইম
      newErrors.age = 'Gender is required';//সেইম
      isValid = false;//সেইম
    }
    if (password.length < 8) {//সেইম
      newErrors.password = 'Password must be at least 8 characters';//সেইম
      isValid = false;//সেইম
    }
    if (!checked) {//সেইম
      newErrors.terms = 'You must accept the terms and conditions';//সেইম
      isValid = false;//সেইম
    }

    setErrors(newErrors);
    return isValid; // উপরে isValid কোনো একটা false হলে এখানে এটার মান false হয়ে যাবে
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Clear all fields
      setName('');
      setEmail('');
      setAge('');
      setPassword('');
      setChecked(false);
      setErrors({ name: '', email: '', age: '', password: '', terms: '' });
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className='w-2/4 mx-auto bg-gray-200'>
      <form onSubmit={handleSubmit} className='flex flex-col p-10'>
        <h1 className=''>FORM</h1>

        <TextField
          id="YourName"
          type='text'
          label="Name"
          variant="standard"
          value={name}
          onChange={handleNameChange}
          error={!!errors.name}//(5)
          helperText={errors.name}
        />

        <TextField
          id="standard-basic"
          type='email'
          label="example@email.com"
          variant="standard"
          value={email}
          onChange={handleEmailChange}
          error={!!errors.email}//(5)
          helperText={errors.email}
        />

        <FormControl variant="standard" sx={{ m: 2, margin: 0 }} className='w-full'>
          <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChangeForGender}
            error={!!errors.age}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {errors.age && <Typography color="error" variant="caption">{errors.age}</Typography>}
        </FormControl>

        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!!errors.password}
          />
          {errors.password && <Typography color="error" variant="caption">{errors.password}</Typography>}
        </FormControl>

        <div className='flex items-center mt-4'>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <h1 className='text-lg'>Would you accept our terms and condition</h1>
        </div>
        {errors.terms && <Typography color="error" variant="caption">{errors.terms}</Typography>}

        <Button type='submit' variant="contained" className='mt-4'>Submit</Button>
      </form>
    </div>
  );
}







// (1) ==> যখন আপনি IconButton এ ক্লিক করেন, ব্রাউজার ডিফল্টভাবে সেই ক্লিক ইভেন্টকে "Focus"-এ পরিণত করতে পারে।
// পাসওয়ার্ড ফিল্ডে focus বা ক্লিক করলে কোনো অনাকাঙ্ক্ষিত form submission বা page refresh হতে পারে।
// event.preventDefault() ব্যবহার করে এটি প্রতিরোধ করা হয়।


// (2) ==> ধাপে ধাপে উদাহরণ:
// ধরুন, showPassword = false:
// ব্যবহারকারী eye icon-এ ক্লিক করলো।
// handleClickShowPassword ফাংশন চালু হলো।
// setShowPassword((show) => !show) কল হলো।
// এখানে show এর মান false।
// !show মানে true।
// showPassword state false থেকে true হলো।
// পাসওয়ার্ড ইনপুট type="text" হলো (পাসওয়ার্ড দৃশ্যমান)।
// ধরুন, showPassword = true:
// ব্যবহারকারী আবার eye icon-এ ক্লিক করলো।
// handleClickShowPassword ফাংশন চালু হলো।
// setShowPassword((show) => !show) কল হলো।
// এখানে show এর মান true।
// !show মানে false।
// showPassword state true থেকে false হলো।
// পাসওয়ার্ড ইনপুট type="password" হলো (পাসওয়ার্ড লুকানো)।



{/* <Visibility />:

এটি Material-UI এর একটি আইকন।
চোখের মতো দেখতে এবং বোঝায় পাসওয়ার্ড দৃশ্যমান করতে এটি ক্লিক করা যাবে।
<VisibilityOff />:

এটি Material-UI এর আরেকটি আইকন।
একটি চোখের উপর লাইন টানা যা বোঝায় পাসওয়ার্ড লুকানো আছে। */}





//  (4)==> যদি checkbox checked হয়(মানে, ব্যবহারকারী টার্মস অ্যান্ড কন্ডিশনস মেনে নিয়েছে), তাহলে setErrors কল করে terms এর error মেসেজ মুছে ফেলা হবে: setErrors((prev) => ({ ...prev, terms: '' }))। এখানে prev হল আগের error অবজেক্ট এবং { ...prev, terms: '' } দ্বারা শুধু terms এর মান পরিবর্তন করা হচ্ছে, অন্য সব ফিল্ড অপরিবর্তিত থাকে।
// 1. State Update(State পরিবর্তন) React - এ:
// React-এ, যখন আপনি স্টেট পরিবর্তন করেন, তখন পুরোনো স্টেটটি সরাসরি মিউটেট (পরিবর্তন) করা উচিত নয়। React এর স্টেট ইমিউটেবল (immutable) হওয়া উচিত, অর্থাৎ, প্রতিবার স্টেট পরিবর্তনের জন্য নতুন স্টেট অবজেক্ট তৈরি করতে হবে, যাতে React ঠিকমতো রেন্ডার করতে পারে।

// যেহেতু আপনি errors স্টেটটি একটি অবজেক্ট হিসেবে ব্যবহার করছেন, তাই আপনি যদি শুধু terms এর মান আপডেট করেন এবং বাকি ফিল্ডগুলির মান অক্ষত রাখতে চান, তবে স্প্রেড অপারেটর (...prev) ব্যবহার করা হয়।

// 2. কেন setErrors((prev) => ({ ...prev, terms: '' })) ব্যবহার করা হচ্ছে:
// স্প্রেড অপারেটর (...prev) ব্যবহারের মাধ্যমে আপনি আগের errors অবজেক্টের সব ফিল্ড বজায় রাখতে পারেন এবং শুধুমাত্র terms ফিল্ডের মান পরিবর্তন করতে পারেন। এটি গুরুত্বপূর্ণ কারণ:

// পুরোনো স্টেট বজায় রাখার জন্য: যদি আপনি setErrors({ terms: '' }) ব্যবহার করেন, তাহলে পুরোনো সব ফিল্ড মুছে যাবে এবং শুধুমাত্র terms থাকবে, যা হতে পারে অপ্রত্যাশিত আচরণ (যেহেতু বাকি ফিল্ডগুলির error মেসেজও মুছে যাবে)।
// বাকি ফিল্ডের মান অক্ষত রাখা: আপনি শুধুমাত্র terms ফিল্ডে পরিবর্তন চান, আর অন্য ফিল্ড (যেমন name, email, password ইত্যাদি) এর মান অপরিবর্তিত রাখতে চান। এজন্য স্প্রেড অপারেটর ব্যবহার করা হচ্ছে।


// (5)==> ধরুন আপনি এমন একটি ফর্ম তৈরি করেছেন যেখানে "নাম" লিখতে হবে। এখন যদি কেউ নাম না লিখে ফর্ম জমা দেয়, তখন "নাম" ফিল্ডের নিচে একটি লাল রঙের সতর্কবার্তা দেখানো দরকার। আর যদি নাম ঠিকভাবে লেখা থাকে, তখন লাল রঙের সতর্কবার্তা দেখানোর দরকার নেই।

// এখানে error={!!errors.name} ঠিক এই কাজটাই করে।

// সহজভাবে ধাপগুলো:
// errors.name কী?
// এটি ফিল্ডে কোনো ভুল (error) আছে কিনা তা জানায়।

// যদি errors.name ফাঁকা হয় (''), এর মানে কোনো ভুল নেই।
// আর যদি errors.name-এ কিছু লেখা থাকে (যেমন: "Name is required"), এর মানে ভুল হয়েছে।
// !!errors.name কী করে?
// এটি errors.name-কে সত্য (true) অথবা মিথ্যা (false)-এ রূপান্তরিত করে।

// যদি errors.name ফাঁকা থাকে, তাহলে !!errors.name হবে false।
// আর যদি errors.name-এ কিছু লেখা থাকে, তাহলে !!errors.name হবে true।
// error প্রোপার্টি কী করে?

// যদি error={true}, তাহলে ফিল্ড লাল আউটলাইন বা সতর্কবার্তা দেখাবে।
// আর যদি error={false}, তাহলে ফিল্ড সাধারণ থাকবে।
// উদাহরণ:
// যদি কেউ নাম না লেখে:
// errors.name = "Name is required";
// !!errors.name হবে true।
// error={true}, তাই ফিল্ড লাল আউটলাইন দেখাবে।
// যদি ঠিকঠাক নাম লেখা হয়:
// errors.name = "";
// !!errors.name হবে false।
// error={false}, তাই ফিল্ড সাধারণ থাকবে।
// সংক্ষেপে:
// error = {!!errors.name} ফিল্ডে ভুল থাকলে লাল আউটলাইন দেখানোর ব্যবস্থা করে।
// আপনার প্রশ্নের উত্তর হলো: Material-UI (MUI) লাইব্রেরি নিজেই স্বয়ংক্রিয়ভাবে ফিল্ড লাল রঙের আউটলাইন বা স্টাইলিং যোগ করে।

// কিভাবে এটি কাজ করে:
// Material-UI এর TextField কম্পোনেন্ট:

// এটি একটি বিল্ট-ইন error প্রোপার্টি প্রদান করে।
// যখন error={true} সেট করা হয়, তখন MUI এর ডিফল্ট স্টাইল স্বয়ংক্রিয়ভাবে সেই ফিল্ডের জন্য লাল আউটলাইন, লাল আন্ডারলাইন বা লাল টেক্সট দেখায়।
// কোনো CSS বা Tailwind ব্যবহার করার দরকার নেই:
// Material-UI এর কম্পোনেন্টগুলোতে আগে থেকেই প্রয়োজনীয় স্টাইল যোগ করা থাকে।
// উদাহরণস্বরূপ:

// jsx
// Copy code
// <TextField 
//   label="Name"
//   error={true} 
//   helperText="Name is required"
// />
// উপরের ক্ষেত্রে error={true} দেওয়ার কারণে:

// আন্ডারলাইন লাল রঙের হবে।
// নিচে helperText দিয়ে দেওয়া টেক্সটও লাল রঙের দেখাবে।
// আপনার কোডে ব্যবহৃত স্টাইল:
// Material-UI helperText এবং error এর জন্য Typography এবং Input কম্পোনেন্টের ডিফল্ট থিম ব্যবহার করে। এর ফলে:

// error={true} হলে লাল আউটলাইন দেখায়।
// helperText এর জন্য লাল রঙের ফন্ট প্রয়োগ করে।
// হ্যাঁ, error প্রোপার্টি এবং এর সাথে সম্পর্কিত স্টাইলিং Material-UI (MUI) এর নিজস্ব জাভাস্ক্রিপ্ট এবং React ভিত্তিক সিস্টেমের অংশ। এটি সম্পূর্ণভাবে MUI লাইব্রেরির মধ্যে বিল্ট-ইন, এবং আপনাকে আলাদা করে CSS বা Tailwind ক্লাস সেট করার দরকার হয় না।