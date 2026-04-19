const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
  author: String,
  metaTitle: String,
  metaDescription: String,
  shortAnswer: String,
  keyTakeaways: String,
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const sampleArticles = [
      {
        title: "วิวัฒนาการของกรอบแว่นสไตล์ Minimal ในปี 2026",
        content: "ในปี 2026 เทรนด์ความเรียบง่าย (Minimalism) ยังคงเป็นหัวใจสำคัญของวงการแฟชั่นกรอบแว่นตา วัสดุอย่างไทเทเนียมน้ำหนักเบาและเส้นสายที่บางเฉียบถูกนำมาใช้เพื่อสร้างสรรค์ผลงานที่ดูหรูหราแต่ถ่อมตัว",
        image: "https://images.unsplash.com/photo-1577803645773-f93893023e61?q=80&w=2070&auto=format&fit=crop",
        category: "Fashion",
        author: "Editor Team",
        metaTitle: "เทรนด์กรอบแว่น Minimal 2026 | Iglass Editorial",
        metaDescription: "เจาะลึกเทรนด์กรอบแว่นตาสไตล์มินิมัลในปี 2026",
        shortAnswer: "เทรนด์ปี 2026 เน้นวัสดุไทเทเนียมและเส้นสายที่บางเฉียบ",
        keyTakeaways: "- ความเรียบง่ายคือหัวใจสำคัญ\n- วัสดุไทเทเนียมได้รับความนิยมสูงสุด"
      },
      {
        title: "นวัตกรรมเลนส์ AI และการปรับแต่งสายตาแห่งอนาคต",
        content: "Iglass นำเสนอเทคโนโลยี AI ในการวิเคราะห์พฤติกรรมการใช้สายตา เพื่อออกแบบเลนส์ที่ตอบโจทย์เฉพาะบุคคลอย่างแท้จริง",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1974&auto=format&fit=crop",
        category: "Technology",
        author: "Tech Specialist",
        metaTitle: "AI Lens Technology 2026 | Iglass Innovation",
        metaDescription: "นวัตกรรมเลนส์ที่ใช้ระบบ AI ในการวิเคราะห์",
        shortAnswer: "เทคโนโลยี AI ช่วยให้เลนส์แม่นยำกว่าเลนส์แบบเดิมถึง 40%",
        keyTakeaways: "- AI วิเคราะห์ค่าสายตาเชิงลึก\n- ปรับแต่งเลนส์แบบรายบุคคล"
      },
      {
        title: "5 เคล็ดลับการเลือกแว่นให้เข้ากับรูปหน้าและไลฟ์สไตล์",
        content: "การเลือกแว่นตาไม่ได้มีแค่เรื่องค่าสายตาเท่านั้น แต่เป็นเรื่องของการเสริมบุคลิกภาพ ไม่ว่าคุณจะมีรูปทรงหน้าแบบไหน",
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop",
        category: "Lifestyle",
        author: "Stylist",
        metaTitle: "Guide: How to choose eyeglasses | Iglass Lifestyle",
        metaDescription: "คู่มือการเลือกทรงแว่นตาให้เหมาะกับรูปหน้า",
        shortAnswer: "หลักการเลือกแว่นคือการเลือกรูปทรงที่ตัดกับรูปทรงใบหน้าของคุณ",
        keyTakeaways: "- หน้ารูปไข่ใส่แว่นทรงไหนก็สวย\n- หน้าทรงเหลี่ยมควรเลือกแว่นทรงมน"
      }
    ];

    await Article.deleteMany({}); // ล้างข้อมูลเก่าก่อน
    await Article.insertMany(sampleArticles);
    
    console.log('Sample articles seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
