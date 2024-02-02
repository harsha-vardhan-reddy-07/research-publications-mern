import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Publication, User } from './schema.js';


const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

import multer from 'multer';

const PORT = 6001;
mongoose.connect('mongodb://localhost:27017/Publications').then(()=>{


    app.post('/register', async (req, res) => {
        const { username, email, usertype, password, domain, qualification } = req.body;
        try {
          
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username, email, usertype, password: hashedPassword, domain, qualification
            });           

            const userCreated = await newUser.save();
            return res.status(201).json(userCreated);

        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });



    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else{
                return res.json(user);
            }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });


    // const upload = multer({ dest: '../client/public/pdfs/' });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '../client/public/pdfs/')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now()
          cb(null, uniqueSuffix + file.originalname)
        }
      })
      
    const upload = multer({ storage: storage })


    app.post('/new-publication', upload.single('file'), async (req, res) => {
        try {
          const file = req.file; // Get uploaded file information
          const otherData = req.body; // Get other data from API request
        
            console.log(file);
            console.log(otherData);

          otherData.keywords = otherData.keywords.split(',').map((keyword) => keyword.trim()); // Split keywords string into array of keywords
           
          const dataToSave = {
            ...otherData,
            pdfFileName: file.filename // Store the file path in the document
          };
      

          const newData = new Publication(dataToSave);

          await newData.save();
      
          res.json({ message: 'File uploaded and data saved successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error uploading file or saving data' });
        }
      });
      

      app.get('/fetch-publications', async(req, res)=>{
        try{
            const publications = await Publication.find();
            res.json(publications);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
      })

      app.get('/fetch-publication/:id', async(req, res)=>{

        try{
            const publication = await Publication.findById(req.params.id);
            res.json(publication);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    })

    app.post('/approve-publication/:id', async(req, res)=>{
      
        try{
            const publication = await Publication.findById(req.params.id);
            publication.status = "accepted";
            publication.evaluator = req.body.evaluator;
            publication.evaluatorId = req.body.evaluatorId;
            publication.evaluationDate = req.body.evaluationDate;
            publication.evaluationNote = req.body.evaluationNote;
            await publication.save();
            res.json(publication);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    })


    app.get('/fetch-users', async(req, res)=>{
      try{
          const users = await User.find();
          res.json(users);
      }catch(error){
          console.log(error);
          res.status(500).json({ message: 'Server Error' });
      }
    })


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((err)=>{
    console.log(err);
})


