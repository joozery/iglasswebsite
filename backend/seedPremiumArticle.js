const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String, default: 'General' },
  author: { type: String, required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  shortAnswer: { type: String },
  keyTakeaways: { type: String },
  faqData: [{ question: String, answer: String }],
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', ArticleSchema);

const premiumArticle = {
  title: 'นวัตกรรมเลนส์โปรเกรสซีฟและการเลือกแว่นตาให้ตอบโจทย์ไลฟ์สไตล์ระดับพรีเมียม',
  author: 'Iglass Expert Team',
  category: 'Eye Care Technology',
  image: 'https://images.unsplash.com/photo-1543789434-6663f9104037?q=80&w=2070&auto=format&fit=crop', // High-end eyewear visual
  content: `
    <h2>1. ศิลปะการเลือกกรอบแว่น: มากกว่าแค่ความสวยงาม แต่คือการสะท้อนตัวตน</h2>
    <p>การเลือกกรอบแว่นตาที่เป็นมิตรกับใบหน้า (Face Shape) คือด่านแรกที่ช่วยสร้างความมั่นใจ กฎพื้นฐานที่นักทัศนมาตรแนะนำมักจะเน้นที่การสร้าง "สมดุล" (Contrast) ให้กับใบหน้า:</p>
    <ul>
      <li><strong>ใบหน้าทรงกลม:</strong> ควรเลือกกรอบที่มีความเหลี่ยมหรือทรงแคทอายเพื่อเพิ่มความมีมิติ</li>
      <li><strong>ใบหน้าทรงเหลี่ยม:</strong> กรอบทรงมนหรือวงรีจะช่วยลดทอนมุมกรามให้ดูซอฟต์และพรีเมียมขึ้น</li>
      <li><strong>ใบหน้าทรงหัวใจ:</strong> การเลือกกรอบที่มีขนาดกว้างกว่าหน้าผากเล็กน้อยจะช่วยสร้างสมดุลให้กับคางที่แคบได้เป็นอย่างดี</li>
    </ul>
    <p>นอกเหนือจากรูปทรงแล้ว <strong>วัสดุ</strong> คือสิ่งที่ Iglass ให้ความสำคัญสูงสุด ไม่ว่าจะเป็น Titanium เกรดการแพทย์ที่มีความเบาและทนทาน หรือ Acetate คุณภาพสูงที่ให้สีสันที่ลุ่มลึกและไม่ระคายเคืองผิว</p>

    <h2>2. นวัตกรรมเลนส์โปรเกรสซีฟ: อิสระแห่งการมองเห็นที่ไร้รอยต่อ</h2>
    <p>เลนส์โปรเกรสซีฟระดับพรีเมียมที่ Iglass เลือกใช้ถูกออกแบบด้วยเทคโนโลยี <strong>Digital Surface Mapping</strong> ซึ่งมอบข้อดีที่เหนือกว่าเลนส์ตามท้องตลาดทั่วไป:</p>
    <h3>ความชัดเจนในระดับตารางมิลลิเมตร</h3>
    <p>เทคโนโลยี Freeform Technology ทำให้พื้นที่การมองเห็นกว้างขึ้น ลดภาพบิดเบือนด้านข้าง (Distortion) และที่สำคัญที่สุดคือ "ความสบายตา" ในการปรับโฟกัสระหว่างระยะใกล้ กลาง และไกล</p>

    <h2>3. การปกป้องดวงตาในยุคดิจิทัล</h2>
    <p>การเลือกเลนส์ที่มีเทคโนโลยี <strong>Blue Block Pro</strong> จะช่วยกรองแสงสีฟ้าในช่วงความถี่ที่เป็นอันตรายออกไป ในขณะที่ยังคงความเพี้ยนของสีให้น้อยที่สุด</p>

    <h2>สรุป</h2>
    <p>การลงทุนกับแว่นตาคุณภาพสูงและเลนส์ที่สั่งตัดมาอย่างแม่นยำ คือการลงทุนในความสุขและประสิทธิภาพการใช้ชีวิตของคุณ ที่ Iglass เราพร้อมมอบประสบการณ์การบริการระดับพรีเมียม</p>
  `,
  metaTitle: 'เลือกแว่นตาและเลนส์โปรเกรสซีฟพรีเมียม | Iglass Optical Lat Krabang',
  metaDescription: 'คู่มือเลือกแว่นตาให้เหมาะกับรูปหน้าและเจาะลึกเทคโนโลยีเลนส์โปรเกรสซีฟแบบ Freeform จากทีมนักทัศนมาตร Iglass เพื่อการมองเห็นที่สมบูรณ์แบบ',
  shortAnswer: 'การเลือกแว่นตาพรีเมียมควรพิจารณาจากรูปทรงใบหน้าที่สร้างสมดุล (Contrast) วัสดุไทเทเนียมน้ำหนักเบา และเลนส์โปรเกรสซีฟเทคโนโลยี Freeform ที่ออกแบบเฉพาะบุคคลเพื่อความสบายตาและลดภาพบิดเบือน',
  keyTakeaways: '1. เลือกกรอบแว่นที่ Contrast กับรูปหน้า 2. เลนส์โปรเกรสซีฟระดับพรีเมียมช่วยลด Distortion 3. Blue Block คือสิ่งจำเป็นในยุคดิจิทัล',
  faqData: [
    { question: 'เลนส์โปรเกรสซีฟคืออะไร?', answer: 'เลนส์ที่ช่วยให้มองชัดได้ทุกระยะ (ใกล้ กลาง ไกล) ในเลนส์เดียวโดยไม่มีรอยต่อ' },
    { question: 'วัดสายตาที่ Iglass ต่างจากที่อื่นอย่างไร?', answer: 'เราตรวจโดยนักทัศนมาตร (Doctor of Optometry) ด้วยเครื่องมือระดับสากล' }
  ]
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for Seeding...');
    
    await Article.create(premiumArticle);
    
    console.log('✅ Premium Article Added Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding article:', err);
    process.exit(1);
  }
}

seed();
