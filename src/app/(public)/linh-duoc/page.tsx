import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import Image from 'next/image';
import localFont from 'next/font/local';
import bannerImage from '@/assets/banner/banner-linh-duoc.png';
import backgroundImage from '@/assets/background/background-linhduoc.png';
import titleBanner from '@/assets/banner/title-banner.png';
import titlePattern from '@/assets/patterns/title-pattern.png';
import thuocNamPattern from '@/assets/patterns/thuoc-nam-pattern.png';
import thuocBacPattern from '@/assets/patterns/thuoc-bac-pattern.png';
import linhDuocBox from '@/assets/boxes/linh-duoc-box.png';
import bigLine from '@/assets/line/big-line.png';
import dvuPattern1 from '@/assets/patterns/dvu-pattern-1.png';
import dvuPattern2 from '@/assets/patterns/dvu-pattern-2.png';
import dvuPattern4 from '@/assets/patterns/dvu-pattern-4.png';
import { Reveal, ScrollPaper } from '@/components';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Linh dược',
  description: 'Danh sách nội dung về linh dược.',
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

export default function HerbListPage() {
  return (
    <div className="w-full">
      <div className="w-full">
        <Image
          src={bannerImage}
          alt="Banner linh dược"
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <section className="relative w-full min-h-screen xl:min-h-[7150px] overflow-hidden bg-[#4D0000]/90 pb-20 xl:pb-0">
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

        <div className="relative z-10 flex flex-col items-center h-full w-full px-4 xl:px-0 xl:gap-0 mt-8 xl:mt-0">
          {/* Title Banner: LINH DƯỢC */}
          <div className="relative xl:absolute flex items-center justify-center p-8 xl:ml-4 w-full max-w-[568.61px] aspect-[568/320] xl:top-[45px]">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-center uppercase xl:mr-4 font-semibold text-[#FDE3B1] leading-[39px] tracking-[-0.03em]`}
            >
              <span className="text-[24px] xl:text-[32.73px]">LINH DƯỢC</span>
            </h1>
          </div>

          {/* Title: NGUYÊN TẮC DỤNG DƯỢC CẦN BIẾT */}
          <div className="relative xl:absolute flex items-center justify-center xl:top-[335px] w-full max-w-[572px] aspect-[572/193] xl:left-1/2 xl:-translate-x-1/2">
            <Image
              src={titlePattern}
              alt="Title Pattern"
              fill
              className="object-contain -z-10"
              priority
            />
            <h2
              className={`${bigShouldersDisplay.className} text-center uppercase font-semibold text-[#B90407] leading-[1.2] tracking-[-0.03em]`}
            >
              <span className="text-[20px] xl:text-[40.58px]">
                NGUYÊN TẮC DỤNG DƯỢC CẦN BIẾT
              </span>
            </h2>
          </div>

          {/* Linh Duoc Box Container */}
          <div className="relative xl:absolute flex flex-col items-center xl:block xl:top-[576px] w-full xl:w-[1167px] h-auto xl:h-[1155px] xl:left-1/2 xl:-translate-x-1/2 gap-8 xl:gap-0 px-4 xl:px-0 py-10 xl:py-0">
            {/* Hình nền: Mobile dùng object-fill để giãn, Desktop dùng object-contain để giữ tỉ lệ */}
            <div className="absolute inset-0">
              <Image
                src={linhDuocBox}
                alt="Linh Duoc Box"
                fill
                className="object-fill xl:object-contain"
                priority
              />
            </div>

            {/* Nội dung bên trong - z-10 để nổi trên nền */}
            <div className="relative z-10 w-full h-full">
              {/* Block 1 */}
              <div className="flex flex-col items-center xl:block">
                <h3
                  className={`${bigShouldersDisplay.className} relative xl:absolute text-center uppercase font-semibold text-[#BA0B00] leading-[1.2] tracking-[-0.03em] w-full xl:w-[724px] xl:h-[73px] xl:left-[235px] top-8 xl:top-[95px]`}
                >
                  <span className="text-[28px] xl:text-[60.77px]">
                    tại sao phải có kiến thức về thuốc?
                  </span>
                </h3>
                <div
                  className={`relative xl:absolute ${beVietnamPro.className} text-[#690F0C] font-normal text-justify flex items-center w-full xl:w-[1029px] xl:h-[120px] xl:left-[77px] xl:top-[221px] mt-12 xl:mt-0 px-2 xl:px-0`}
                >
                  <p className="text-[14px] xl:text-[16.68px] leading-[1.6] xl:leading-[21px]">
                    Lorsem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum." Section 1.10.32 of "de
                    Finibus Bonorum et Malorum", written by Cicero in 45 BC "Sed
                    ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                    sed quia consequuntur magni dolores eos qu
                  </p>
                </div>
              </div>

              {/* Block 2 */}
              <div className="flex flex-col items-center xl:block mt-10 xl:mt-0">
                <h3
                  className={`${bigShouldersDisplay.className} relative xl:absolute text-center uppercase font-semibold text-[#BA0B00] leading-[1.2] tracking-[-0.03em] w-full xl:w-[921px] xl:h-[73px] xl:left-[127px] xl:top-[425px]`}
                >
                  <span className="text-[28px] xl:text-[60.77px]">
                    TẠI SAO PHẢI PHỐI THUỐC KHÔNG DÙNG ĐƠN LẺ?
                  </span>
                </h3>
                <div
                  className={`relative xl:absolute ${beVietnamPro.className} text-[#690F0C] font-normal text-justify flex items-center w-full xl:w-[1029px] xl:h-[120px] xl:left-[77px] xl:top-[551px] mt-4 xl:mt-0 px-2 xl:px-0`}
                >
                  <p className="text-[14px] xl:text-[16.68px] leading-[1.6] xl:leading-[21px]">
                    Lorsem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum." Section 1.10.32 of "de
                    Finibus Bonorum et Malorum", written by Cicero in 45 BC "Sed
                    ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                    sed quia consequuntur magni dolores eos qu
                  </p>
                </div>
              </div>

              {/* Block 3 */}
              <div className="flex flex-col items-center xl:block mt-10 xl:mt-0 mb-10 xl:mb-0">
                <h3
                  className={`${bigShouldersDisplay.className} relative xl:absolute text-center uppercase font-semibold text-[#BA0B00] leading-[1.2] tracking-[-0.03em] w-full xl:w-[724px] xl:h-[73px] xl:left-[235px] xl:top-[745px]`}
                >
                  <span className="text-[28px] xl:text-[60.77px]">
                    tại sao phải có kiến thức về thuốc?
                  </span>
                </h3>
                <div
                  className={`relative xl:absolute ${beVietnamPro.className} text-[#690F0C] font-normal text-justify flex items-center w-full xl:w-[1029px] xl:h-[120px] xl:left-[77px] xl:top-[891px] mt-4 xl:mt-0 px-2 xl:px-0`}
                >
                  <p className="text-[14px] xl:text-[16.68px] leading-[1.6] xl:leading-[21px]">
                    Lorsem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum." Section 1.10.32 of "de
                    Finibus Bonorum et Malorum", written by Cicero in 45 BC "Sed
                    ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                    sed quia consequuntur magni dolores eos qu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BIG LINE DECORATION 1 */}
          <div className="relative xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:top-[1791px] w-full max-w-[300px] xl:max-w-[700px] h-auto flex items-center justify-center mt-4 xl:my-0">
            <Image
              src={bigLine}
              alt="Decoration Line"
              className="object-contain w-full h-auto"
            />
          </div>

          {/* Title Banner: TẠI SAO NAM DƯỢC ... */}
          <div className="relative xl:absolute flex items-center justify-center xl:ml-4 w-full max-w-[568.61px] aspect-[568/320] xl:top-[1891px]">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-center uppercase xl:mr-4 font-semibold text-[#FDE3B1] leading-[39px] tracking-[-0.03em]`}
            >
              <span className="text-[20px] xl:text-[32.73px]">
                TẠI SAO NAM DƯỢC LÀ LINH DƯỢC?
              </span>
            </h1>
          </div>

          {/* THUOC NAM Section */}
          <div className="w-full flex flex-col xl:block items-center xl:gap-0">
            {/* Pattern + Title */}
            <div className="relative xl:absolute xl:top-[2131px] w-[70%] xl:w-[537.25px] aspect-[537/760] xl:left-1/2 xl:-translate-x-[520px]">
              <Reveal dir="left" width="w-full" className="h-full">
                <Image
                  src={thuocNamPattern}
                  alt="Thuoc Nam Pattern"
                  fill
                  className="object-contain"
                  priority
                />
              </Reveal>
              <h2
                className={`${bigShouldersDisplay.className} text-center uppercase font-semibold text-[#FDE3B1] leading-[1.2] tracking-[-0.03em] absolute top-[13%] left-1/2 -translate-x-1/2 xl:w-[201px] xl:h-[70px] xl:left-[173px] xl:top-[95px] xl:translate-x-0`}
              >
                <span className="text-[20px] pt-10 xl:text-[58.72px]">
                  THUỐC NAM
                </span>
              </h2>
            </div>

            {/* Content Text */}
            <div className="relative xl:absolute z-0 flex items-center xl:top-[2361px] w-full max-w-[452px] xl:h-[300px] xl:left-1/2 xl:translate-x-[85px]">
              <Reveal dir="right" delay={150} width="w-full">
                <ScrollPaper>
                  <p
                    className={`${beVietnamPro.className} text-[#5A3410] font-normal text-justify text-[10px] xl:text-[16.68px] leading-[1.5] xl:leading-[21px]`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.&quot;
                    <br />
                    <br />
                    Section 1.10.32 of &quot;de Finibus Bonorum et
                    Malorum&quot;, written by Cicero in 45 BC
                    <br />
                    &quot;Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qu
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>

          {/* THUOC BAC Section */}
          <div className="w-full flex flex-col xl:block items-center xl:gap-0">
            {/* Pattern + Title */}
            <div className="relative xl:absolute xl:top-[2753px] w-[60%] xl:w-[537.25px] aspect-[537/760] xl:left-1/2 xl:translate-x-[0px] xl:order-last">
              <Reveal dir="right" width="w-full" className="h-full">
                <Image
                  src={thuocBacPattern}
                  alt="Thuoc Bac Pattern"
                  fill
                  className="object-contain"
                  priority
                />
              </Reveal>
              <h2
                className={`${bigShouldersDisplay.className} text-center uppercase font-semibold text-[#FDE3B1] leading-[1.2] tracking-[-0.03em] absolute top-[12%] left-1/2 -translate-x-1/2 xl:w-[201px] xl:h-[70px] xl:left-[173px] xl:top-[95px] xl:translate-x-0`}
              >
                <span className="text-[20px] xl:text-[58.72px]">THUỐC BẮC</span>
              </h2>
            </div>

            {/* Content Text (DOM Reordered for mobile flow: Pattern is displayed first on mobile via flex order, but here I can just use flex-col on mobile and natural order.
               Wait, Thuoc Bac: Pattern is at 2753, Text is at 2983. So Pattern IS first naturally.
               Wait, in original code: Text at 2983 was listed BEFORE Pattern at 2753.
               I will list Pattern first here so it appears on top in mobile.
            */}
            <div className="relative xl:absolute z-0 flex items-center xl:top-[2983px] w-full max-w-[452px] xl:h-[300px] xl:left-1/2 xl:-translate-x-[520px]">
              <Reveal dir="left" delay={150} width="w-full">
                <ScrollPaper>
                  <p
                    className={`${beVietnamPro.className} text-[#5A3410] font-normal text-justify text-[10px] xl:text-[16.68px] leading-[1.5] xl:leading-[21px]`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.&quot;
                    <br />
                    <br />
                    Section 1.10.32 of &quot;de Finibus Bonorum et
                    Malorum&quot;, written by Cicero in 45 BC
                    <br />
                    &quot;Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qu
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>

          {/* BIG LINE DECORATION 2 */}
          <div className="relative xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:top-[3443px] w-full max-w-[300px] xl:max-w-[700px] h-auto flex items-center justify-center my-4 xl:my-0">
            <Image
              src={bigLine}
              alt="Decoration Line"
              className="object-contain w-full h-auto"
            />
          </div>

          {/* Title Banner: HUYỀN CƠ ... */}
          <div className="relative xl:absolute flex items-center justify-center p-8 xl:ml-4 w-full max-w-[568.61px] aspect-[568/320] xl:top-[3583px]">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-center uppercase xl:mr-4 font-semibold text-[#FDE3B1] leading-[39px] tracking-[-0.03em]`}
            >
              <span className="text-[20px] xl:text-[32.73px]">
                HUYỀN CƠ TẠO NÊN LINH DƯỢC
              </span>
            </h1>
          </div>

          {/* Text Block */}
          <div className="relative xl:absolute z-0 flex items-center xl:top-[3946px] w-[90%] xl:w-[1032px] xl:h-[440px] xl:left-1/2 xl:-translate-x-[516px]">
            <Reveal dir="up" width="w-full">
              {/* <JadeTablet> */}
              <p
                className={`${beVietnamPro.className} text-[#F3ECC7] font-normal text-justify text-[10px] xl:text-[16.68px] leading-[1.5] xl:leading-[21px]`}
                style={{ textShadow: '0 1px 1px rgba(0,0,0,0.5)' }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.&quot;
                <br />
                <br />
                Section 1.10.32 of &quot;de Finibus Bonorum et Malorum&quot;,
                written by Cicero in 45 BC
                <br />
                &quot;Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qu
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.&quot;
                <br />
                <br />
                Section 1.10.32 of &quot;de Finibus Bonorum et Malorum&quot;,
                written by Cicero in 45 BC
                <br />
                &quot;Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qu
              </p>
              {/* </JadeTablet> */}
            </Reveal>
          </div>

          {/* Title Banner: CÁC VỊ THUỐC ... */}
          <div className="relative xl:absolute flex items-center justify-center p-8 xl:ml-4 w-full max-w-[568.61px] aspect-[568/320] xl:top-[4484px]">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-center uppercase xl:mr-4 font-semibold text-[#FDE3B1] leading-[39px] tracking-[-0.03em]`}
            >
              <span className="text-[24px] xl:text-[32.73px]">
                CÁC VỊ THUỐC DÂN TỘC
              </span>
            </h1>
          </div>

          {/* Item 1: THUỐC 1 */}
          <div className="w-full flex flex-col xl:block items-center gap-6 xl:gap-0">
            {/* Title */}
            <div className="relative xl:absolute flex items-center justify-center xl:top-[4820px] w-full max-w-[572px] aspect-[572/193] xl:left-1/2 xl:-translate-x-1/2">
              <Image
                src={titlePattern}
                alt="Title Pattern"
                fill
                className="object-contain -z-10"
                priority
              />
              <h2
                className={`${bigShouldersDisplay.className} text-center uppercase font-semibold text-[#B90407] leading-[1.2] tracking-[-0.03em]`}
              >
                <span className="text-[20px] xl:text-[40.58px]">THUỐC 1</span>
              </h2>
            </div>

            {/* Pattern Image */}
            <div className="relative xl:absolute xl:top-[4990px] w-[60%] xl:w-[443px] aspect-[443/571] xl:left-1/2 xl:-translate-x-[519px]">
              <Reveal dir="left" width="w-full" className="h-full">
                <Image
                  src={dvuPattern1}
                  alt="Dvu Pattern 1"
                  fill
                  className="object-contain"
                  priority
                />
              </Reveal>
            </div>

            {/* Text */}
            <div className="relative xl:absolute z-0 flex items-center xl:top-[5100px] w-full max-w-[539px] xl:h-[357px] xl:left-1/2 xl:translate-x-[16px]">
              <Reveal dir="right" delay={150} width="w-full">
                <ScrollPaper>
                  <p
                    className={`${beVietnamPro.className} text-[#5A3410] font-normal text-justify text-[10px] xl:text-[16.68px] leading-[1.5] xl:leading-[21px]`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.&quot;
                    <br />
                    <br />
                    Section 1.10.32 of &quot;de Finibus Bonorum et
                    Malorum&quot;, written by Cicero in 45 BC
                    <br />
                    &quot;Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qu
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>

          {/* Item 2: THUỐC 2 */}
          <div className="w-full flex flex-col xl:block items-center gap-6 xl:gap-0">
            {/* Title */}
            <div className="relative xl:absolute flex items-center justify-center xl:top-[5570px] w-full max-w-[572px] aspect-[572/193] xl:left-1/2 xl:-translate-x-1/2">
              <Image
                src={titlePattern}
                alt="Title Pattern"
                fill
                className="object-contain -z-10"
                priority
              />
              <h2
                className={`${bigShouldersDisplay.className} text-center uppercase font-semibold text-[#B90407] leading-[1.2] tracking-[-0.03em]`}
              >
                <span className="text-[20px] xl:text-[40.58px]">THUỐC 2</span>
              </h2>
            </div>

            {/* Pattern Image (Note: In original, Image at 5790, Text at 5870) */}
            <div className="relative xl:absolute xl:top-[5790px] w-[60%] xl:w-[443px] aspect-[443/481] xl:left-1/2 xl:translate-x-[74px]">
              <Reveal dir="right" width="w-full" className="h-full">
                <Image
                  src={dvuPattern2}
                  alt="Dvu Pattern 2"
                  fill
                  className="object-contain"
                  priority
                />
              </Reveal>
            </div>

            {/* Text */}
            <div className="relative xl:absolute z-0 flex items-center xl:top-[5870px] w-full max-w-[539px] xl:h-[357px] xl:left-1/2 xl:-translate-x-[509px]">
              <Reveal dir="left" delay={150} width="w-full">
                <ScrollPaper>
                  <p
                    className={`${beVietnamPro.className} text-[#5A3410] font-normal text-justify text-[10px] xl:text-[16.68px] leading-[1.5] xl:leading-[21px]`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.&quot;
                    <br />
                    <br />
                    Section 1.10.32 of &quot;de Finibus Bonorum et
                    Malorum&quot;, written by Cicero in 45 BC
                    <br />
                    &quot;Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qu
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>

          {/* Item 3: THUỐC 3 */}
          <div className="w-full flex flex-col xl:block items-center gap-6 xl:gap-0">
            {/* Title */}
            <div className="relative xl:absolute flex items-center justify-center xl:top-[6330px] w-full max-w-[572px] aspect-[572/193] xl:left-1/2 xl:-translate-x-1/2">
              <Image
                src={titlePattern}
                alt="Title Pattern"
                fill
                className="object-contain -z-10"
                priority
              />
              <h2
                className={`${bigShouldersDisplay.className} text-center uppercase font-semibold text-[#B90407] leading-[1.2] tracking-[-0.03em]`}
              >
                <span className="text-[20px] xl:text-[40.58px]">THUỐC 3</span>
              </h2>
            </div>

            {/* Pattern Image (Note: In original, Image at 6560, Text at 6630) */}
            <div className="relative xl:absolute xl:top-[6560px] w-[60%] xl:w-[443px] aspect-[443/481] xl:left-1/2 xl:translate-x-[74px]">
              <Reveal dir="right" width="w-full" className="h-full">
                <Image
                  src={dvuPattern4}
                  alt="Dvu Pattern 4"
                  fill
                  className="object-contain"
                  priority
                />
              </Reveal>
            </div>

            {/* Text */}
            <div className="relative xl:absolute z-0 flex items-center xl:top-[6630px] w-full max-w-[539px] xl:h-[357px] xl:left-1/2 xl:-translate-x-[509px]">
              <Reveal dir="left" delay={150} width="w-full">
                <ScrollPaper>
                  <p
                    className={`${beVietnamPro.className} text-[#5A3410] font-normal text-justify text-[10px] xl:text-[16.68px] leading-[1.5] xl:leading-[21px]`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.&quot;
                    <br />
                    <br />
                    Section 1.10.32 of &quot;de Finibus Bonorum et
                    Malorum&quot;, written by Cicero in 45 BC
                    <br />
                    &quot;Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qu
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
