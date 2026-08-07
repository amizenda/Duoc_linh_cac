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
                  className={`${bigShouldersDisplay.className} relative xl:absolute text-center uppercase font-semibold text-[#BA0B00] leading-[1.2] tracking-[-0.03em] w-full xl:w-[724px] xl:h-[73px] xl:left-[235px] top-8 xl:top-[75px]`}
                >
                  <span className="text-[28px] xl:text-[60.77px]">
                    tại sao phải có kiến thức về thuốc?
                  </span>
                </h3>
                <div
                  className={`relative xl:absolute ${beVietnamPro.className} text-[#690F0C] font-normal text-justify flex items-center w-full xl:w-[1029px] xl:h-[180px] xl:left-[77px] xl:top-[181px] mt-12 xl:mt-0 px-2 xl:px-0`}
                >
                  <p className="text-[14px] xl:text-[16.68px] leading-[1.6] xl:leading-[21px]">
                    Mỗi vị thuốc đều có tính vị, quy kinh và công năng riêng.
                    Nếu dùng sai liều lượng, sai thể trạng hoặc phối hợp không
                    đúng cách, dược liệu quý cũng có thể trở thành con dao hai
                    lưỡi. Ví dụ, nhân sâm vốn đại bổ nguyên khí nhưng nếu dùng
                    cho người đang cảm sốt hoặc thể nhiệt lại có thể phản tác
                    dụng, gây bứt rứt, khó ngủ.
                    <br />
                    <br />
                    Vì vậy, hiểu biết về dược tính, thể trạng và bệnh lý là nền
                    tảng để dùng thuốc an toàn, tránh tình trạng “có bệnh vái tứ
                    phương”, tự ý dùng thuốc theo lời truyền miệng mà không rõ
                    cơ chế tác dụng, từ đó phát huy trọn vẹn hiệu quả chữa bệnh
                    của từng vị dược liệu.
                  </p>
                </div>
              </div>

              {/* Block 2 */}
              <div className="flex flex-col items-center xl:block mt-10 xl:mt-0">
                <h3
                  className={`${bigShouldersDisplay.className} relative xl:absolute text-center uppercase font-semibold text-[#BA0B00] leading-[1.2] tracking-[-0.03em] w-full xl:w-[921px] xl:h-[73px] xl:left-[127px] xl:top-[405px]`}
                >
                  <span className="text-[28px] xl:text-[60.77px]">
                    TẠI SAO PHẢI PHỐI THUỐC KHÔNG DÙNG ĐƠN LẺ?
                  </span>
                </h3>
                <div
                  className={`relative xl:absolute ${beVietnamPro.className} text-[#690F0C] font-normal text-justify flex items-center w-full xl:w-[1029px] xl:h-[180px] xl:left-[77px] xl:top-[511px] mt-4 xl:mt-0 px-2 xl:px-0`}
                >
                  <p className="text-[14px] xl:text-[16.68px] leading-[1.6] xl:leading-[21px]">
                    Trong Y học cổ truyền, các vị thuốc thường được phối ngũ
                    theo nguyên tắc quân - thần - tá - sứ để tương hỗ, dẫn dắt
                    và trung hòa dược tính lẫn nhau. Vị quân đóng vai trò chủ
                    trị, vị thần hỗ trợ tăng hiệu quả, vị tá giảm bớt độc tính
                    hoặc tác dụng phụ, còn vị sứ dẫn thuốc đến đúng tạng phủ cần
                    điều trị.
                    <br />
                    <br />
                    Một bài thuốc phối hợp hợp lý sẽ tăng hiệu quả điều trị và
                    giảm bớt tác dụng phụ, thay vì dùng đơn lẻ một vị thuốc
                    riêng biệt vốn dễ gây mất cân bằng âm dương trong cơ thể.
                    Đây cũng chính là lý do vì sao các bài thuốc gia truyền
                    thường gồm nhiều vị phối hợp thay vì chỉ một vị duy nhất.
                  </p>
                </div>
              </div>

              {/* Block 3 */}
              <div className="flex flex-col items-center xl:block mt-10 xl:mt-0 mb-10 xl:mb-0">
                <h3
                  className={`${bigShouldersDisplay.className} relative xl:absolute text-center uppercase font-semibold text-[#BA0B00] leading-[1.2] tracking-[-0.03em] w-full xl:w-[724px] xl:h-[73px] xl:left-[235px] xl:top-[735px]`}
                >
                  <span className="text-[28px] xl:text-[60.77px]">
                    dùng đúng liều lượng và thời điểm
                  </span>
                </h3>
                <div
                  className={`relative xl:absolute ${beVietnamPro.className} text-[#690F0C] font-normal text-justify flex items-center w-full xl:w-[1029px] xl:h-[180px] xl:left-[77px] xl:top-[841px] mt-4 xl:mt-0 px-2 xl:px-0`}
                >
                  <p className="text-[14px] xl:text-[16.68px] leading-[1.6] xl:leading-[21px]">
                    Dùng đúng liều lượng và đúng thời điểm là nguyên tắc sống
                    còn khi dùng thuốc. Uống quá liều hoặc sai thời điểm trong
                    ngày có thể làm giảm hiệu quả, thậm chí gây hại cho cơ thể.
                    Chẳng hạn, thuốc bổ thường nên dùng vào buổi sáng để cơ thể
                    hấp thu tốt nhất, trong khi thuốc an thần lại phù hợp dùng
                    vào buổi tối trước khi ngủ.
                    <br />
                    <br />
                    Vì vậy, người bệnh nên tuân thủ hướng dẫn của thầy thuốc
                    thay vì tự ý gia giảm liều lượng theo cảm tính, đồng thời
                    kiên trì dùng đủ liệu trình để dược tính có đủ thời gian
                    phát huy tác dụng, tránh bỏ dở giữa chừng khiến việc điều
                    trị không đạt hiệu quả như mong muốn.
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
                    Thuốc Nam là những vị thuốc có nguồn gốc từ cây cỏ, hoa lá
                    quen thuộc trên đất Việt, được ông cha ta đúc kết qua hàng
                    ngàn năm kinh nghiệm thực tiễn, gắn liền với khí hậu, thổ
                    nhưỡng và thể trạng của người Việt Nam.
                    <br />
                    <br />
                    Chính vì sinh trưởng cùng một vùng đất, cùng chịu ảnh hưởng
                    của cùng một khí hậu với con người nơi đó, thuốc Nam mang
                    dược tính hài hòa, dễ hấp thu và ít gây phản ứng phụ hơn so
                    với các dược liệu ngoại lai.
                    <br />
                    Đây cũng là lý do vì sao thuốc Nam được xem là nguồn linh
                    dược quý giá, gần gũi mà hiệu quả, xứng đáng được gìn giữ và
                    phát huy trong đời sống hiện đại.
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
                    Thuốc Bắc là hệ thống dược liệu có nguồn gốc từ nền Y học cổ
                    truyền Trung Hoa, được lưu truyền và Việt hóa qua nhiều thế
                    hệ lương y, trở thành một phần không thể tách rời của nền Y
                    học cổ truyền Việt Nam.
                    <br />
                    <br />
                    Với hệ thống lý luận âm dương, ngũ hành và tạng phủ kinh lạc
                    chặt chẽ, thuốc Bắc thường được bào chế công phu và phối hợp
                    thành các bài thuốc hoàn chỉnh, hướng đến điều trị tận gốc
                    căn nguyên bệnh tật.
                    <br />
                    Sự kết hợp giữa thuốc Nam và thuốc Bắc, giữa kinh nghiệm bản
                    địa và tinh hoa y học lâu đời, chính là nền tảng tạo nên
                    chiều sâu tri thức của Y học cổ truyền ngày nay.
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
                Một vị thuốc muốn trở thành linh dược không chỉ dựa vào bản chất
                dược liệu, mà còn phụ thuộc vào huyền cơ hội tụ đủ ba yếu tố:
                thiên thời, địa lợi và nhân hòa. Cây thuốc hái đúng mùa, đủ tuổi
                sẽ tích lũy dược tính tinh túy nhất; đất đai nơi cây sinh trưởng
                quyết định khí vị và công năng của dược liệu; còn bàn tay người
                bào chế, với tâm huyết và kinh nghiệm gia truyền, là yếu tố cuối
                cùng đánh thức trọn vẹn linh khí ẩn chứa trong từng vị thuốc.
                <br />
                <br />
                Chính sự hòa quyện giữa tự nhiên, đất trời và con người đã tạo
                nên những bài thuốc không đơn thuần là sự cộng gộp của các vị
                dược liệu, mà là kết tinh của cả một quá trình thấu hiểu quy
                luật vận hành của vạn vật. Đó cũng là lý do vì sao mỗi bài thuốc
                gia truyền tại Dược Linh Các đều được gìn giữ, chưng cất theo
                đúng huyền cơ truyền thống, để mỗi vị thuốc khi đến tay người
                dùng đều mang trọn giá trị của một linh dược đích thực.
                <br />
                <br />
                Huyền cơ ấy không nằm trong sách vở, mà được truyền lại qua
                nhiều thế hệ lương y bằng chính sự quan sát, chiêm nghiệm và
                thực hành không ngừng nghỉ — từ cách chọn đất trồng, thời điểm
                thu hái, đến bí quyết sơ chế, bào chế sao cho dược tính không bị
                hao hụt theo thời gian. Mỗi công đoạn tưởng chừng nhỏ nhặt ấy
                lại chính là nơi gửi gắm tâm huyết và trách nhiệm của người làm
                nghề thuốc đối với sức khỏe người dùng.
                <br />
                <br />
                Tại Dược Linh Các, việc gìn giữ huyền cơ gia truyền không chỉ là
                bảo tồn một bài thuốc, mà còn là tiếp nối một mạch nguồn tri
                thức đã được đúc kết qua nhiều đời, để mỗi thế hệ sau vẫn có thể
                thừa hưởng trọn vẹn giá trị của linh dược, góp phần nuôi dưỡng
                sức khỏe bền vững theo năm tháng.
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

          {/* Item 1: ĐINH LĂNG */}
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
                <span className="text-[20px] xl:text-[40.58px]">ĐINH LĂNG</span>
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
                    Đinh lăng từ lâu đã được xem là “nhân sâm của người nghèo”
                    trong dân gian Việt Nam, bởi rễ cây chứa nhiều hoạt chất quý
                    có tác dụng bồi bổ cơ thể, tăng cường sức đề kháng và hỗ trợ
                    lưu thông khí huyết.
                    <br />
                    <br />
                    Theo Y học cổ truyền, đinh lăng có vị ngọt, hơi đắng, tính
                    mát, thường được dùng để hỗ trợ an thần, giảm mệt mỏi và
                    kích thích tiêu hóa. Lá đinh lăng còn được dùng để nấu nước
                    uống hằng ngày, giúp cơ thể thanh nhẹ và khí huyết lưu
                    thông.
                    <br />
                    Với đặc tính lành, dễ tìm và gần gũi trong đời sống, đinh
                    lăng xứng đáng là một trong những vị thuốc dân tộc quý giá,
                    được nhiều gia đình Việt tin dùng qua nhiều thế hệ.
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>

          {/* Item 2: NHÂN SÂM */}
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
                <span className="text-[20px] xl:text-[40.58px]">NHÂN SÂM</span>
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
                    Nhân sâm được mệnh danh là “vua của các loại thảo dược”
                    trong Y học cổ truyền phương Đông, nổi tiếng với công năng
                    đại bổ nguyên khí, ích huyết sinh tân và nâng cao thể trạng
                    cho người suy nhược, mới ốm dậy.
                    <br />
                    <br />
                    Với vị ngọt hơi đắng, tính ấm, nhân sâm thường được dùng để
                    hỗ trợ phục hồi sức khỏe, tăng cường trí nhớ và cải thiện
                    tuần hoàn khí huyết. Đây là vị thuốc quý được nhiều bài
                    thuốc bổ dưỡng lựa chọn làm chủ vị.
                    <br />
                    Tuy nhiên, do dược tính mạnh, nhân sâm cần được dùng đúng
                    liều lượng và phù hợp với thể trạng từng người, tốt nhất nên
                    có sự tư vấn của thầy thuốc trước khi sử dụng lâu dài.
                  </p>
                </ScrollPaper>
              </Reveal>
            </div>
          </div>

          {/* Item 3: TAM THẤT */}
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
                <span className="text-[20px] xl:text-[40.58px]">TAM THẤT</span>
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
                    Tam thất được ví như “kim bất hoán” — vàng cũng không đổi
                    được — trong Y học cổ truyền, nhờ công năng hành ứ, chỉ
                    huyết và giảm sưng đau vượt trội, đặc biệt quý giá đối với
                    phụ nữ sau sinh và người mới trải qua phẫu thuật.
                    <br />
                    <br />
                    Với vị đắng ngọt, tính ấm, tam thất thường được dùng để hỗ
                    trợ cầm máu, tan bầm và bồi bổ khí huyết. Củ tam thất cũng
                    được nhiều gia đình dùng để hãm nước uống hoặc mài lấy bột
                    pha uống nhằm tăng cường thể trạng.
                    <br />
                    Là một trong những vị thuốc quý hiếm, tam thất thường mọc ở
                    vùng núi cao, đòi hỏi nhiều năm chăm sóc mới có thể thu
                    hoạch, càng khẳng định giá trị của một linh dược đích thực.
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
