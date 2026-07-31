import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import localFont from 'next/font/local';
import backgroundImage from '@/assets/background/background-chungbenh.png';
import bannerImage from '@/assets/banner/banner-chung-benh.png';
import titleBanner from '@/assets/banner/title-banner.png';
import chungBenhBox from '@/assets/boxes/chung-benh-box.png';
import redBox from '@/assets/boxes/red-box.png';
import cranePattern from '@/assets/patterns/crane-pattern.png';
import Image from 'next/image';
import { Reveal } from '@/components';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Chứng bệnh',
  description: 'Danh sách nội dung về chứng bệnh.',
};

// 2. Cấu hình font
const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const bigShouldersDisplay = localFont({
  src: [
    {
      path: '../../../assets/fonts/BigShouldersDisplay-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/BigShouldersStencil_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-big-shoulders-display',
  display: 'swap',
});

// Self-contained ribbon tag: caps are fixed-shape SVGs, the middle bar is a
// plain gradient div that stretches with the text — so unlike a ribbon baked
// into a background image at a fixed position, this always fits whatever
// text it wraps, no matter how long or short.
function RibbonCap({ mirrored }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 60"
      preserveAspectRatio="none"
      className="h-full w-[22px] shrink-0 md:w-[34px]"
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`ribbonGold-${mirrored ? 'r' : 'l'}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFE3A1" />
          <stop offset="100%" stopColor="#C98A00" />
        </linearGradient>
      </defs>
      <path
        d="M15,2 L40,2 L40,58 L15,58 L2,30 Z"
        fill={`url(#ribbonGold-${mirrored ? 'r' : 'l'})`}
        stroke="#8A5A00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="14"
        cy="30"
        r="4.5"
        fill="#E1362B"
        stroke="#7A0000"
        strokeWidth="1"
      />
    </svg>
  );
}

function RibbonTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-3 flex h-fit max-w-full items-stretch drop-shadow-md md:mb-4">
      <RibbonCap />
      <div
        className="flex min-h-[38px] items-center justify-center px-3 text-center md:min-h-[56px] md:px-5"
        style={{
          background: 'linear-gradient(to bottom, #FFE3A1, #C98A00)',
          borderTop: '1.5px solid #8A5A00',
          borderBottom: '1.5px solid #8A5A00',
        }}
      >
        <h3
          className={`${bigShouldersDisplay.className} font-semibold uppercase text-[#B90407]`}
        >
          <span className="text-[16px] leading-tight md:text-[32px]">
            {children}
          </span>
        </h3>
      </div>
      <RibbonCap mirrored />
    </div>
  );
}

export default async function DiseaseListPage() {
  return (
    <div className="w-full">
      <div className="w-full">
        <Image
          src={bannerImage}
          alt="Banner chứng bệnh"
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <section className="relative w-full min-h-screen overflow-hidden bg-[#4D0000]/90 pb-20">
        <Image
          src={backgroundImage}
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
        <div className="relative z-10 flex flex-col items-center h-full px-4 md:px-0">
          {/* Title Banner */}
          <div className="relative mt-8 md:mt-[45px] w-full max-w-[568px] aspect-[568/320] flex items-center justify-center p-8">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-center uppercase md:mr-4`}
              style={{
                lineHeight: '1.2',
                letterSpacing: '-0.03em',
                color: '#FDE3B1',
              }}
            >
              <span className="text-[20px] md:text-[32px] font-semibold">
                CÁC CHỨNG TRẠNG BỆNH NHÂN THƯỜNG GẶP
              </span>
            </h1>
          </div>

          {/* Main Content Box */}
          <Reveal
            dir="up"
            width="w-full"
            className="relative mt-4 md:mt-[60px] max-w-[1167px] mx-auto"
          >
            <div className="absolute inset-0 -z-10 w-full h-full">
              <Image
                src={chungBenhBox}
                alt="Chứng bệnh box"
                fill
                className="object-fill"
                priority
              />
            </div>

            <div className="flex flex-col items-center justify-center px-6 py-12 md:px-[77px] md:py-[80px] text-center md:text-left">
              <Reveal delay={150}>
                <h2
                  className={`${bigShouldersDisplay.className} text-[#BA0B00] uppercase font-semibold mb-3 md:mb-6 text-center`}
                >
                  <span className="text-[20px] md:text-[50px] lg:text-[60px] leading-tight">
                    HỤT HƠI, THỞ NGẮN, VẬN ĐỘNG NHANH MỆT
                  </span>
                </h2>
              </Reveal>

              <div
                className={`${beVietnamPro.className} text-[#690F0C] font-normal mb-4 md:mb-8 text-justify`}
              >
                <span className="text-[10px] md:text-[16px] leading-[1.5]">
                  Chứng hụt hơi, thở ngắn, vận động nhanh mệt, có thể kèm theo
                  bụng hay chướng đầy, mắc tiểu phải đi ngay không nhịn được
                  lâu. Hoặc có thể kèm theo chứng dễ ho, ngứa họng khi trời mưa
                  ẩm hoặc thời tiết thay đổi; thỉnh thoảng trí nhớ hay quên cục
                  bộ. Bạn có bao giờ bị như vậy không? Khi bị như vậy bạn thường
                  nghĩ đến mình bị bệnh gì? Nguyên nhân tại sao?{' '}
                  <br className="hidden md:block" />
                  Phần lớn bệnh nhân khi thấy hụt hơi, thở ngắn, nhanh mệt
                  thường hay nghĩ đến Phổi và tìm bệnh ở Phổi và đường hô hấp
                  trên. Nếu kèm theo thỉnh thoảng hay quên cục bộ sẽ hay cho
                  rằng ảnh hưởng hậu COVID.
                </span>
              </div>

              <div
                className={`${beVietnamPro.className} text-[#771010] font-bold text-[12px] md:text-[20px] mb-3 md:mb-4 text-left md:text-left w-full`}
              >
                Nếu bạn phán đoán như vậy thì không sai nhưng chưa ĐÚNG, ĐỦ
              </div>

              <div
                className={`${beVietnamPro.className} text-[#690F0C] font-normal mb-8 text-justify`}
              >
                <span className="text-[10px] md:text-[16px] leading-[1.5]">
                  Chẩn đoán theo chuyên môn, chứng bệnh gặp phải ở phổi và hầu
                  họng, đường hô hấp trên; y học cổ truyền gọi đây là chứng
                  “NGỰC ĐẦY KHÍ ĐOẢN”. Để hiểu rõ nguyên nhân cần kiểm tra tổng
                  quát thông qua bắt mạch, quan sát và trò chuyện, trao đổi với
                  bệnh nhân “Tứ Chuẩn”, thậm chí kiểm tra một số sinh nguyệt và
                  một số điểm phản ứng trên cơ thể (Án Chẩn). Thông thường có
                  một số căn nguyên sau đây:
                </span>
              </div>

              <RibbonTag>DO THẬN HƯ KHÍ NGHỊCH</RibbonTag>

              <div
                className={`${beVietnamPro.className} text-[#690F0C] font-normal mb-8 text-justify`}
              >
                <span className="text-[10px] md:text-[16px] leading-[1.5]">
                  Tức là thận dương nạp khí kém; lượng khí do phổi hô hấp không
                  được thận dương nạp đủ đầy dẫn đến dư, ứ khí ở phế (phổi).
                  Lượng khí này tuy là thanh khí nhưng khi bị dư đầy ở phế sẽ
                  làm cho lượng khí mới hít vào không có chỗ chứa, do đó có cảm
                  giác hơi thở ngắn, ngực đầy tức gọi là chứng “NGỰC ĐẦY KHÍ
                  ĐOẢN”. Lượng khí thừa ử phế như lớp sương mù, “quá mù sẽ ra
                  mưa”, khí ứ dễ hóa dịch gây ho ở hầu họng và có thể gây sổ
                  mũi. Hoặc khi ăn đồ có canh nóng như phở, hủ tiếu, canh nóng…
                  dễ chảy nước mũi.
                </span>
              </div>

              <RibbonTag>CƠ THỂ SẼ TỰ CHỮA BỆNH NHƯ THẾ NÀO?</RibbonTag>

              <div
                className={`${beVietnamPro.className} text-[#690F0C] font-normal text-justify`}
              >
                <span className="text-[10px] md:text-[16px] leading-[1.5]">
                  Thường cơ thể con người rất vi diệu khi gặp những biến động
                  bất thường nó sẽ tự điều chỉnh tạo ra các phản ứng để “sữa
                  chữa” ví dụ: thường sẽ hay ngáp , hoặc vương vai thở dài đây
                  là phản ứng tự nhiên để tống tháo khi thừa trong lòng ngực ra.
                </span>
              </div>
            </div>
          </Reveal>

          <div className="relative w-full max-w-[1200px] mt-[-20px] md:mt-[-50px] lg:mt-[-100px] md:mb-[-100px] h-[200px] md:h-[400px] lg:h-[675px] z-0">
            <Reveal width="w-full" className="h-full">
              <Image
                src={cranePattern}
                alt="Crane Pattern"
                fill
                className="object-contain"
              />
            </Reveal>
          </div>

          <div className="relative w-full max-w-[757px] mt-8 md:mt-0 z-10 p-4">
            <div className="absolute inset-0 -z-10 w-full h-full">
              <Image src={redBox} alt="Red Box" fill className="object-fill" />
            </div>
            <Reveal>
              <div className="flex flex-col items-center justify-center p-10 md:p-12 lg:p-16">
                <div
                  className={`${bigShouldersDisplay.className} text-center uppercase`}
                  style={{
                    fontWeight: 600,
                    color: '#FFF017',
                    fontFeatureSettings: "'salt' on, 'kern' off",
                  }}
                >
                  <p className="text-[12px] md:text-[27px] leading-relaxed mb-4">
                    Pháp trị của DLC tùy theo từng bệnh nhân với các chứng trạng
                    kèm theo khác nhau để lập pháp trị. Thường chứng trạng trên
                    nếu ở thể nhẹ chỉ cần lập phác đồ châm cứu hoặc bấm huyệt
                    phục hồi công năng nạp khí của thận dương là phế thông họng
                    thoáng.
                  </p>
                  <p className="text-[12px] md:text-[27px] leading-relaxed">
                    Trường hợp bệnh nặng hơn hay kèm theo các chứng bụng chướng
                    đầy, mắc tiểu không nhịn lâu do tùy khí hạ hãm, khí chèn
                    bàng quan gây áp lực mắc tiểu không nhịn lâu thì có thể phải
                    lập phương dụng dược “kê thuốc” dùng thuốc nam để điều trị.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
