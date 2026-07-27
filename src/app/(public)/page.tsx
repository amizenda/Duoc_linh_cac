import type { Metadata } from 'next';
import Image from 'next/image';
import { Protest_Strike, Be_Vietnam_Pro } from 'next/font/google';
import backgroundSection1 from '@/assets/background/background-section-1.png';
import backgroundSection2 from '@/assets/background/background-section-2.png';
import box1 from '@/assets/boxes/box-1.png';
import box2 from '@/assets/boxes/box-2.png';
import box3 from '@/assets/boxes/box-3.png';
import box4 from '@/assets/boxes/box-4.png';
import textBox1 from '@/assets/boxes/text-box-1.png';
import textBox2 from '@/assets/boxes/text-box-2.png';
import textBox3 from '@/assets/boxes/text-box-3.png';
import bigBox from '@/assets/boxes/big-box.png';
import bannerImage from '@/assets/banner/banner.png';
import bigLine from '@/assets/line/big-line.png';
import smallLine from '@/assets/line/small-line.png';
import localFont from 'next/font/local';
import { Reveal } from '@/components';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description:
    'Dược Linh Các – nội dung sức khỏe, dược liệu, dịch vụ và bài đăng.',
};

// 2. Cấu hình font
const protestStrike = Protest_Strike({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const bigShouldersDisplay = localFont({
  src: [
    {
      path: '../../assets/fonts/BigShouldersDisplay-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/BigShouldersStencil_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-big-shoulders-display',
  display: 'swap',
});

// Load thêm font Stencil nếu cần hoặc dùng chung biến variable
const bigShouldersStencilDisplay = localFont({
  src: [
    {
      path: '../../assets/fonts/BigShouldersStencil_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-big-shoulders-stencil-display',
  display: 'swap',
});

export default async function HomePage() {
  return (
    <div className="">
      <section className="relative min-h-[55vh] lg:min-h-[870px] w-full overflow-hidden bg-[#4D0000]/90">
        <Image
          src={backgroundSection1}
          alt=""
          fill
          className="object-cover object-center pointer-events-none opacity-100"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
          }}
          priority
        />
        <div className="relative z-10 flex flex-col items-center h-full pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="relative w-full max-w-[1200px] lg:max-w-[700px]">
            <Image
              src={bannerImage}
              alt="Dược Linh Các Banner"
              width={1200}
              height={600}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
            {/* DƯỢC LINH CÁC */}
            <h1
              className={`${protestStrike.className} absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center whitespace-nowrap animate-glow-text`}
              style={{
                top: '50%',
                fontSize: 'clamp(26px, 5vw, 90px)',
                lineHeight: '1',
                color: '#FFF017',
                textTransform: 'uppercase',
                WebkitTextStroke: '2px #ED333E',
              }}
            >
              DƯỢC LINH CÁC
            </h1>

            {/* VƯỢT TRÊN KỲ VỌNG CỦA BẠN */}
            <p
              className={`${beVietnamPro.className} absolute left-1/2 -translate-x-1/2 w-full text-center text-[6px] lg:text-[14px]`}
              style={{
                top: '60%',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#FFF017',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              - VƯỢT TRÊN KỲ VỌNG CỦA BẠN -
            </p>
            {/* BIG LINE DECORATION */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center top-[115%] w-[60%] lg:w-[90%] max-w-[700px] h-auto">
              <Image
                src={bigLine}
                alt="Decoration Line"
                className="object-contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            {/* 3 DÒNG TEXT MỚI */}
            <div
              className={`absolute top-[155%] left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-1 md:gap-2 ${bigShouldersDisplay.className}`}
              style={{
                color: '#FDE3B1',
                textTransform: 'uppercase',
                textAlign: 'center',
                letterSpacing: '-0.03em',
              }}
            >
              {/* Dòng 1: y thuật nguyễn tộc đại tôn */}
              <p
                style={{
                  fontSize: 'clamp(18px, 4vw, 40px)',
                  lineHeight: '1.2',
                }}
              >
                y thuật nguyễn tộc đại tôn
              </p>

              {/* Dòng 2: vạn đại trường tồn danh kế thịnh */}
              <p
                style={{
                  fontSize: 'clamp(18px, 4vw, 40px)',
                  lineHeight: '1.2',
                }}
              >
                vạn đại trường tồn danh kế thịnh
              </p>

              {/* Dòng 3: Tông chủ đời thứ 8... */}
              <p
                className="md:mt-0 whitespace-nowrap"
                style={{
                  fontSize: 'clamp(16px, 3.5vw, 40px)',
                  lineHeight: '1.2',
                }}
              >
                Tông chủ đời thứ 8 – Tiến sĩ - Lương y Hùng Phi Nguyễn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCALLOP / ROOF-TILE WAVE SEAM */}
      <div className="relative z-20 w-full -mt-[36px] lg:-mt-[56px] pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-[36px] lg:h-[56px] block"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' }}
        >
          <defs>
            <linearGradient id="roofTileGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C98A00" />
              <stop offset="50%" stopColor="#FFD272" />
              <stop offset="100%" stopColor="#C98A00" />
            </linearGradient>
          </defs>
          <path
            d="M0,10 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 a45,18 0 0 0 90,0 L1440,60 L0,60 Z"
            fill="url(#roofTileGold)"
          />
        </svg>
      </div>

      <section className="relative min-h-[1000px] lg:min-h-[3000px] w-full overflow-hidden bg-[#4D0000]/90 lg:pt-32 pt-8 lg:pb-20">
        <Image
          src={backgroundSection2}
          alt=""
          fill
          className="object-cover object-center pointer-events-none opacity-100"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
          }}
          priority
        />

        {/* CONTAINER CHO 3 BOX */}
        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch">
            {/* CỘT TRÁI: Box 1 nằm trên, Box 2 nằm dưới - Auto height */}
            <div className="flex flex-col gap-4 lg:gap-8">
              {/* Box 1 */}
              <div className="w-full group">
                <Image
                  src={box1}
                  alt="Box 1"
                  className="!w-full !h-auto block"
                  style={{ width: '100%', height: 'auto' }} // Ép buộc width 100%
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Box 2 */}
              <div className="w-full">
                <Image
                  src={box2}
                  alt="Box 2"
                  className="!w-full !h-auto block"
                  style={{ width: '100%', height: 'auto' }} // Ép buộc width 100%
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* CỘT PHẢI: Box 3 - Height bằng tổng cột trái */}
            <div className="relative w-full h-full min-h-[500px] lg:min-h-0">
              <Image
                src={box3}
                alt="Box 3"
                fill
                className="object-fill rounded-lg shadow-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* TEXT OVERLAY 1: Intro */}
              <p
                className={`${bigShouldersDisplay.className} absolute top-[8%] lg:top-[12%] left-1/2 -translate-x-1/2 text-center uppercase pointer-events-none z-10 w-[90%] md:w-[337px]`}
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 4vw, 26.85px)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.03em',
                  color: '#BA0B00',
                  fontFeatureSettings: "'salt' on, 'kern' off",
                }}
              >
                Vốn là một tiên sinh ẩn danh lấy pháp hiệu là Nguyên Quốc - mọi
                người thường gọi là Nguyên Quốc tiên sinh.
              </p>

              {/* TEXT OVERLAY 2: Header Title */}
              <div
                className={`${bigShouldersDisplay.className} absolute top-[30%] lg:top-[32%] left-1/2 -translate-x-1/2 text-center z-10 flex flex-col items-center w-[95%] md:w-[586px]`}
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 4.5vw, 26.85px)',
                  lineHeight: '1.2',
                  letterSpacing: '0.01em',
                  fontVariant: 'all-small-caps',
                  color: '#BA0B00',
                }}
              >
                <span>Về Nguyên Quốc Tiên Sinh</span>
                <span>(Tiến Sĩ Nguyễn Phi Hùng)</span>
              </div>

              {/* TEXT OVERLAY 3: Body List */}
              <div
                className={`${beVietnamPro.className} absolute top-[42%] lg:top-[42%] left-1/2 -translate-x-1/2 z-10 flex flex-col gap-2 lg:gap-3 w-[80%] md:w-[355px] text-[10px] leading-tight lg:text-[15px] lg:leading-[1.5]`}
                style={{
                  fontWeight: 400,
                  color: '#690F0C',
                }}
              >
                <p>
                  - Không chỉ thừa hưởng Y Tông truyền thừa của gia tộc từ năm
                  Cảnh Thịnh thứ II (thế kỷ XVII).
                </p>
                <p>
                  - Từ 1988–1991: Thụ giáo Minh Sư – đệ tử Đại Sư Thi Kim Mặc
                  (TQ).
                </p>
                <p>- Tổng hợp tinh hoa – huyền cơ – y thuật YHCT VN & TQ.</p>
                <p>
                  - Từ 1991 đến nay: Nguyên Quốc Tiên Sinh đã qua các lớp đào
                  tạo YHCT chính quy trong & ngoài nước.
                </p>
                <p>
                  - Từng công tác trong Quân đội tại Đông Bắc & Tây Bắc. Với bản
                  tính khiêm hạ, ý chí ham học hỏi nên đã thụ học được nhiều bài
                  thuốc quý dân gian của bà con dân tộc Dao, Mường, Tày, Mông;
                  thông thạo hàng trăm vị thuốc Nam của rừng nguyên sinh khu vực
                  Đông Bắc và Tây Bắc Việt Nam.
                </p>
                <p>
                  - Theo đó những bài thuốc quý hiếm ấy đã chữa lành nhiều bệnh
                  hiểm nghèo, nhiều ca bệnh khó mà các bệnh nhân đã từng chữa
                  trị trong và ngoài nước không khỏi.
                </p>
              </div>
            </div>
            {/* BOX 4: Nằm dưới Box 2 và Box 3, full width */}
            <div className="col-span-1 lg:col-span-2 w-full pt-4 lg:pt-8 flex flex-col items-center">
              {/* Box 4 Image & Overlay Wrapper */}
              <div className="relative w-full">
                <Image
                  src={box4}
                  alt="Box 4"
                  className="!w-full !h-auto rounded-lg shadow-xl block"
                  style={{ width: '100%', height: 'auto' }}
                  sizes="100vw"
                />

                {/* Box 4 Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center md:justify-center pt-[5%] z-10 px-6 md:pt-4">
                  {/* Title */}
                  <Reveal>
                    <h3
                      className={`${bigShouldersDisplay.className} text-center uppercase w-full md:max-w-[386px] font-[600] text-[14px] lg:text-[40.6px] leading-[1.2] tracking-[-0.03em] text-[#B90407] mb-[16px] lg:mb-[64px]`}
                    >
                      Phương châm của dược linh các
                    </h3>
                  </Reveal>

                  {/* Slogan */}
                  <Reveal delay={200}>
                    <p
                      className={`${bigShouldersDisplay.className} text-center uppercase w-full md:max-w-[380px] font-semibold text-[10px] lg:text-[26.85px] leading-[1.2] tracking-[-0.03em] text-[#B90407]`}
                      style={{
                        fontFeatureSettings: "'salt' on, 'kern' off",
                      }}
                    >
                      “Thuận Theo Tự Nhiên – Thân Khỏe Tâm An
                      <br className="md:block" />
                      Nghiệp Chướng Tiêu Tan – Chân Mệnh Vững Bền"
                    </p>
                  </Reveal>
                </div>
              </div>

              {/* Decoration Line below Box 4 */}
              <div className="mt-6 lg:mt-16 w-full flex justify-center ">
                <Reveal className="w-[50%] lg:w-full max-w-[700px] flex items-center justify-center">
                  <Image
                    src={bigLine}
                    alt="Decoration Line"
                    className="w-full h-auto object-contain"
                  />
                </Reveal>
              </div>

              {/* New Footer Text */}
              <Reveal delay={200}>
                <h3
                  className={`${bigShouldersDisplay.className} text-center uppercase mt-6 lg:mt-12 block w-full md:max-w-[666px] font-semibold text-[20px] lg:text-[44.6px] leading-[1.2] tracking-[-0.03em] text-[#FFE7B6]`}
                  style={{
                    fontFeatureSettings: "'salt' on, 'kern' off",
                  }}
                >
                  "Chúc mừng bạn hữu duyên biết đến DƯỢC LINH CÁC
                  <br /> Tại sao vậy?"
                </h3>
              </Reveal>

              {/* SECTION: NĂNG LỰC CHẨN ĐOÁN */}
              <Reveal
                width="w-full"
                className="flex flex-col items-center mt-6 lg:mt-12 relative max-w-[800px] px-2"
                delay={400}
              >
                {/* Header with Small Line Icon */}
                <div className="flex flex-row md:flex-row items-center gap-2 md:gap-4 mb-4">
                  <div className="relative w-[24px] h-[60px] md:w-[86px] md:h-[86px] flex-shrink-0">
                    <Image
                      src={smallLine}
                      alt="Small Line"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4
                    className={`${bigShouldersStencilDisplay.className} uppercase text-center md:text-left w-full max-w-[492px] font-normal text-[20px] lg:text-[31.96px] leading-[1.2] tracking-[0.01em] text-[#FFE7B6]`}
                  >
                    NĂNG LỰC CHẨN ĐOÁN CỦA DƯỢC LINH CÁC
                  </h4>
                </div>

                {/* Content Body */}
                <div
                  className={`${beVietnamPro.className} md:pl-[100px] text-left w-[90%] md:max-w-[737px] font-normal text-[10px] lg:text-[16.9px] leading-[1.5] text-[#FFE7B6]`}
                >
                  <p className="mb-2">
                    Nhiều bệnh nhân từng khám ở các bệnh viện và các cơ sở Khám
                    Chữa bệnh nhưng không tìm ra nguyên nhân.
                  </p>
                  <p>
                    Nhưng tại Dược Linh Các:
                    <br />
                    - Nguyên Quốc tiên sinh & các đội ngũ Y – Bác sỹ chẩn đoán
                    đúng gốc bệnh.
                    <br />
                    - Luận giải chính xác triệu chứng mà bệnh nhân đang mắc phải
                    nhưng không khai bệnh.
                    <br />- Đặc biệt các pháp điều trị và phương thuốc Nam Dược
                    của Dược Linh Các đã chữa khỏi bệnh; giải quyết các vấn đề
                    “vượt trên kỳ vọng”của bệnh nhân
                  </p>
                </div>
              </Reveal>

              {/* 3 TEXT BOXES (1, 2, 3) */}
              <div className="flex flex-col gap-6 lg:gap-10 mt-6 lg:mt-12 w-full max-w-[1000px] items-center pb-10 lg:pb-20">
                {/* Box 1 */}
                <Reveal width="w-full" className="relative" dir="left">
                  <Image
                    src={textBox1}
                    alt="Text Box 1"
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className={`${beVietnamPro.className} absolute top-[4%] md:top-[8%] left-5 md:left-0 w-full flex items-center justify-center text-center px-4 font-bold text-[12px] lg:text-[16.9px] leading-[1.2] text-[#FFF017]`}
                  >
                    Giá trị cốt lõi của DLC – Bí truyền Nam Dược
                  </p>
                  <div
                    className={`${beVietnamPro.className} absolute top-[30%] left-[58%] md:left-[58%] -translate-x-1/2 w-[80%] md:w-[80%] flex flex-col gap-1 lg:gap-2 font-normal text-[6px] lg:text-[16.9px] leading-[1.2] text-[#FFE7B6] text-left`}
                  >
                    <p>
                      - Các vị thuốc gia truyền là những vị thuốc quý từ rừng
                      nguyên sinh VN, nhiều vị thuốc bộ dây có tuổi thọ từ 60–80
                      năm chỉ có ở rừng nguyên sinh, nhiều bộ rễ, củ được tìm
                      kiếm ở các vị trí cheo leo, khó khai thác nhưng công dụng
                      bí truyền vô cùng vi diệu.
                    </p>
                    <p>
                      - Thuốc nam được bào chế nguyên chất, không xao tẩm hương
                      liệu, không có chất bảo quản.
                    </p>
                    <p>
                      - Khi bào chế còn được lựa chọn điểm Phơi–Sấy trên nền Đất
                      Cát Mạch để hấp thụ Thiên Khí và Địa Tinh của Trời Đất –
                      theo đó dược tính được phát huy công hiệu mà khoa học
                      không giải thích được nên gọi đó là Huyền Cơ.
                    </p>
                    <p>
                      - Thực tiễn cho thấy vẫn những vị thuốc đó không may phơi
                      trên nền đất Địa Tinh là Hung Mạch (đặc bệt xấu nếu hung
                      mạch đó thuộc mạch Thọ Tử Kim Lâu hoặc mạch Vãng Lai Tâm)
                      → công dụng giảm đi rất nhiều.
                    </p>
                    <p>
                      - Nguồn nguyên liệu của DLC phát huy được tất cả những thế
                      mạnh Huyền Cơ và khắc phục những điểm yếu nêu trên.
                    </p>
                  </div>
                </Reveal>

                {/* Box 2 */}
                <Reveal width="w-full" className="relative" dir="right">
                  <Image
                    src={textBox2}
                    alt="Text Box 2"
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className={`${beVietnamPro.className} absolute bottom-[82%] md:top-[10%] left-13 md:left-0 w-[80%] md:w-full flex items-center justify-center text-left px-2 font-bold text-[12px] lg:text-[16.9px] leading-[1.2] text-[#FFF017]`}
                  >
                    Tại sao thuốc Nam tốt, quý và hiệu quả hơn thuốc Bắc?
                  </p>
                  <div
                    className={`${beVietnamPro.className} absolute top-[45%] left-[58%] md:left-[58%] -translate-x-1/2 w-[80%] md:w-[80%] flex flex-col gap-1 lg:gap-2 font-normal text-[6px] lg:text-[16.9px] leading-[1.2] text-[#FFE7B6] text-left`}
                  >
                    <p>
                      - Thuốc Bắc ở TQ là trồng ở các vùng nguyên liệu có thời
                      hạn tối đa 5 năm là khai thác, do TQ có chính sách bảo tồn
                      rừng nguyên sinh, không cho người dân tiếp cận, khai thác
                      dược liệu.
                    </p>
                    <p>
                      - Ngoài ra để bảo quản và vẫn chuyển xuất khẩu thuốc Bắc
                      thường được xông chất chống mốc để vận chuyển .Nên phần
                      nào ảnh hưởng đến dược tính và sự phụ thuộc vào nguồn
                      nguyên liệu của nhiều Y Gia.
                    </p>
                  </div>
                </Reveal>

                {/* Box 3 */}
                <Reveal width="w-full" className="relative mt-2" dir="left">
                  <Image
                    src={textBox3}
                    alt="Text Box 3"
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className={`${beVietnamPro.className} absolute bottom-[72%] md:top-[10%] left-13 md:left-30 w-[80%] md:w-full flex items-center justify-center text-left px-2 font-bold text-[12px] lg:text-[16.9px] leading-[1.2] text-[#FFF017]`}
                  >
                    <span className="block md:hidden">
                      Hãy cùng Dược Linh Các chỉnh Tâm - sửa Tính để tự chữa
                      lành vi diệu
                    </span>

                    {/* Nội dung ẩn trên Mobile, hiện trên Desktop */}
                    <span className="hidden md:block">
                      Năng lực tự chữa bệnh của con người là vô cùng vi diệu nên
                      dù <br />
                      thuốc quý đến đâu bạn cũng nên hợp tác với Dược Linh Các
                      để chỉnh tâm - sửa tính.
                    </span>
                  </p>
                  <div
                    className={`${beVietnamPro.className} absolute top-[60%] left-[58%] md:left-[58%] -translate-x-1/2 w-[80%] md:w-[80%] flex flex-col gap-1 lg:gap-2 font-normal text-[6px] lg:text-[16.9px] leading-[1.2] text-[#FFE7B6] text-left`}
                  >
                    <p>
                      - Năng lực tự chữa bệnh của con người là vô cùng vi diệu
                      nên dù thuốc quý đến đâu bạn cũng nên hợp tác vs DLC để
                      chỉnh tâm-sửa tính.
                    </p>
                  </div>
                </Reveal>

                <div className="flex flex-col w-full items-center gap-4 mt-2">
                  {/* Decoration Line below Box 4 */}
                  <div className="lg:mt-8 w-full flex justify-center ">
                    <Reveal className="w-[50%] lg:w-full max-w-[700px] flex items-center justify-center">
                      <Image
                        src={bigLine}
                        alt="Decoration Line"
                        className="w-full h-auto object-contain"
                      />
                    </Reveal>
                  </div>

                  {/* Text 1: ĐỂ HỘI ĐỦ DUYÊN... */}
                  <Reveal delay={200} width="w-full">
                    <h3
                      className={`${bigShouldersDisplay.className} text-center uppercase mt-6 mx-auto w-[95%] md:max-w-[782px] font-semibold text-[20px] lg:text-[44.6px] leading-[1.2] tracking-[-0.03em] text-[#FFE7B6]`}
                      style={{ fontFeatureSettings: "'salt' on, 'kern' off" }}
                    >
                      ĐỂ HỘI ĐỦ DUYÊN ĐẾN DƯỢC LINH CÁC BẠN CẦN BIẾT THÊM
                    </h3>
                  </Reveal>

                  {/* Text 2: Thông điệp di huấn... */}
                  <Reveal delay={400} width="w-full">
                    <h4
                      className={`${bigShouldersStencilDisplay.className} text-center mx-auto w-full md:max-w-[492px] font-normal text-[14px] lg:text-[31.96px] leading-[1.2] tracking-[0.01em] text-[#FFE7B6]`}
                    >
                      Thông điệp di huấn của Tông Môn:
                    </h4>
                  </Reveal>

                  {/* Big Box Image */}
                  <Reveal
                    width="w-full"
                    className="relative max-w-[800px] flex justify-center"
                    delay={600}
                  >
                    <Image
                      src={bigBox}
                      alt="Big Box"
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute top-[12%] lg:top-[15%] left-1/2 -translate-x-1/2 w-[90%] md:w-full flex flex-col items-center">
                      <p
                        className={`${bigShouldersDisplay.className} text-center uppercase w-[65%] lg:w-full max-w-[368px] font-semibold text-[14px] lg:text-[27px] leading-[1.2] tracking-[-0.03em] text-[#FFF017]`}
                        style={{ fontFeatureSettings: "'salt' on, 'kern' off" }}
                      >
                        THIÊN VŨ TUY KHOAN BẤT NHUẬN VÔ CĂN CHI THẢO THẦN Y
                        QUẢNG ĐẠI NAN ĐỘ BẤT TÍN CHI NHÂN
                      </p>
                    </div>

                    <div className="absolute top-[48%] lg:top-[50%] left-1/2 -translate-x-1/2 w-[90%] md:w-full flex flex-col items-center">
                      <p
                        className={`${bigShouldersDisplay.className} text-center uppercase pt-2 lg:pt-6 w-[65%] lg:w-[55%] max-w-[630px] font-semibold text-[12px] lg:text-[27px] leading-[1.2] tracking-[-0.03em] text-[#FFF017]`}
                        style={{ fontFeatureSettings: "'salt' on, 'kern' off" }}
                      >
                        Trời có cho mưa thuận gió hoà cũng không làm tươi nhuận
                        những cây đã hỏng gốc rễ.
                        <br />
                        Tài giỏi độ lượng như Thần Y cũng không chữa khỏi cho
                        người thiếu lòng tin – tâm còn bất tín.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
