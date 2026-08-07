import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import Image from 'next/image';
import bannerImage from '@/assets/banner/banner-dich-vu.png';
import backgroundImage from '@/assets/background/background-dichvu.png';
import titleBanner from '@/assets/banner/title-banner.png';
import titlePattern from '@/assets/patterns/title-pattern.png';
import dvuPattern1 from '@/assets/patterns/dvu-pattern-1.png';
import dvuPattern2 from '@/assets/patterns/dvu-pattern-2.png';
import dvuPattern3 from '@/assets/patterns/dvu-pattern-3.png';
import dvuPattern4 from '@/assets/patterns/dvu-pattern-4.png';
import localFont from 'next/font/local';
import { Reveal, ScrollPaper } from '@/components';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description: 'Danh sách nội dung về dịch vụ.',
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

export default function ServiceListPage() {
  return (
    <div className="w-full">
      <div className="w-full">
        <Image
          src={bannerImage}
          alt="Banner dịch vụ"
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <section className="relative w-full min-h-screen md:min-h-[3550px] overflow-hidden bg-[#4D0000]/90 pb-20 md:pb-0">
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
        <div className="relative z-10 flex flex-col items-center h-full w-full px-4 md:px-0 gap-12 md:gap-0 mt-8 md:mt-0">
          {/* Banner Title */}
          <div className="relative md:absolute flex items-center justify-center p-8 md:ml-4 w-full md:w-[568.61px] aspect-[568/320] md:top-[45px]">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-center uppercase md:mr-4 font-semibold text-[#FDE3B1] leading-[1.2] tracking-[-0.03em]`}
            >
              <span className="text-[20px] md:text-[32.73px]">
                SẢN PHẨM - DỊCH VỤ
              </span>
            </h1>
          </div>

          {/* Item 1: Y TRÀ DƯỠNG SINH */}
          <div className="w-full flex flex-col items-center md:block">
            {/* Title */}
            <div className="relative md:absolute flex items-center justify-center md:top-[335px] w-full max-w-[572px] aspect-[572/193] md:left-1/2 md:-translate-x-1/2 mb-4 md:mb-0">
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
                <span className="text-[20px] md:text-[40.5px]">
                  Y TRÀ DƯỠNG SINH
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:block w-full items-center gap-6 md:gap-0">
              {/* Image */}
              <div className="relative md:absolute md:top-[540px] w-[60%] max-w-[443px] aspect-[443/571] md:left-1/2 md:-translate-x-[519px]">
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
              <div className="relative md:absolute z-0 md:top-[660px] w-full max-w-[539px] md:h-[357px] md:left-1/2 md:translate-x-[16px] flex items-center">
                <Reveal dir="right" delay={150} width="w-full">
                  <ScrollPaper>
                    <div
                      className={`${beVietnamPro.className} text-[#5A3410] text-justify text-[12px] md:text-[15px] leading-[1.6] md:leading-[1.6] font-normal`}
                    >
                      Y trà dưỡng sinh là sự kết hợp giữa tinh hoa trà đạo và
                      dược liệu quý trong Y học cổ truyền, được gia giảm theo
                      từng thể trạng nhằm hỗ trợ điều hòa khí huyết, thanh lọc
                      cơ thể và tăng cường sức đề kháng tự nhiên. Mỗi loại trà
                      dưỡng sinh đều được phối chế từ các vị thảo dược lành
                      tính, gần gũi với đời sống hằng ngày, giúp người dùng duy
                      trì trạng thái an hòa cả về thể chất lẫn tinh thần.
                      <br />
                      <br />
                      Không chỉ đơn thuần là thức uống, y trà còn mang triết lý
                      “phòng bệnh hơn chữa bệnh” của y học phương Đông — dùng
                      dưỡng sinh để nuôi dưỡng cơ thể từ gốc, giúp khí huyết lưu
                      thông, tạng phủ được điều hòa theo quy luật tự nhiên của
                      bốn mùa.
                      <br />
                      Tùy theo nhu cầu và thể trạng của từng người, Dược Linh
                      Các sẽ tư vấn loại trà phù hợp, đồng hành cùng quý khách
                      trên hành trình chăm sóc sức khỏe lâu dài và bền vững.
                    </div>
                  </ScrollPaper>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Item 2: TƯ VẤN THẦY TẠI NHÀ... */}
          <div className="w-full flex flex-col items-center md:block">
            {/* Title */}
            <div className="relative md:absolute flex items-center justify-center md:top-[1120px] w-full max-w-[572px] aspect-[572/193] md:left-1/2 md:-translate-x-1/2 mb-4 md:mb-0">
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
                <span className="text-[20px] md:text-[40.5px]">
                  TƯ VẤN THẦY TẠI NHÀ - THUỐC TẠI VƯỜN
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:block w-full items-center gap-6 md:gap-0">
              {/* Image (Mobile Order 2) */}
              <div className="relative md:absolute md:top-[1365px] w-[60%] max-w-[443px] aspect-[443/481] md:left-1/2 md:translate-x-[74px] md:order-none">
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

              {/* Text (Mobile Order 3) */}
              <div className="relative md:absolute z-0 md:top-[1440px] w-full max-w-[539px] md:h-[357px] md:left-1/2 md:-translate-x-[509px] flex items-center md:order-none">
                <Reveal dir="left" delay={150} width="w-full">
                  <ScrollPaper>
                    <div
                      className={`${beVietnamPro.className} text-[#5A3410] text-justify text-[12px] md:text-[15px] leading-[1.6] md:leading-[1.6] font-normal`}
                    >
                      Thấu hiểu rằng không phải ai cũng có điều kiện đi lại thăm
                      khám, Dược Linh Các mang đến dịch vụ tư vấn thầy thuốc tận
                      nhà, giúp người bệnh được thăm hỏi, bắt mạch và hướng dẫn
                      dùng thuốc ngay trong không gian quen thuộc của gia đình,
                      tiết kiệm thời gian và công sức di chuyển.
                      <br />
                      <br />
                      Song song đó, triết lý “thuốc tại vườn” hướng đến việc tận
                      dụng nguồn dược liệu sẵn có quanh nơi sinh sống — những
                      cây thuốc Nam quen thuộc trong vườn nhà — để bào chế thành
                      các bài thuốc đơn giản, an toàn và gần gũi, giúp người dân
                      chủ động chăm sóc sức khỏe ngay tại chỗ.
                      <br />
                      Đây là sự kết hợp giữa kinh nghiệm y học cổ truyền lâu đời
                      và điều kiện thực tế của từng gia đình, hướng đến một nền
                      y học vừa hiệu quả vừa thiết thực, dễ tiếp cận với mọi
                      người.
                    </div>
                  </ScrollPaper>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Item 3: TƯ VẤN PHONG THỦY */}
          <div className="w-full flex flex-col items-center md:block">
            {/* Title */}
            <div className="relative md:absolute flex items-center justify-center md:top-[1888px] w-full max-w-[572px] aspect-[572/193] md:left-1/2 md:-translate-x-1/2 mb-4 md:mb-0">
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
                <span className="text-[20px] md:text-[40.5px]">
                  TƯ VẤN PHONG THỦY CẢI BỆNH
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:block w-full items-center gap-6 md:gap-0">
              {/* Image */}
              <div className="relative md:absolute md:top-[2092px] w-[60%] max-w-[443px] aspect-[443/566] md:left-1/2 md:-translate-x-[516px]">
                <Reveal dir="left" width="w-full" className="h-full">
                  <Image
                    src={dvuPattern3}
                    alt="Dvu Pattern 3"
                    fill
                    className="object-contain"
                    priority
                  />
                </Reveal>
              </div>

              {/* Text */}
              <div className="relative md:absolute z-0 md:top-[2213px] w-full max-w-[539px] md:h-[357px] md:left-1/2 md:translate-x-[16px] flex items-center">
                <Reveal dir="right" delay={150} width="w-full">
                  <ScrollPaper>
                    <div
                      className={`${beVietnamPro.className} text-[#5A3410] text-justify text-[12px] md:text-[15px] leading-[1.6] md:leading-[1.6] font-normal`}
                    >
                      Trong quan niệm Y học cổ truyền, con người là một tiểu vũ
                      trụ chịu ảnh hưởng mật thiết từ môi trường xung quanh.
                      Phong thủy không gian sống — hướng nhà, cách bài trí, sự
                      lưu thông của khí — được xem là một trong những yếu tố góp
                      phần tác động đến sức khỏe và tinh thần của gia chủ.
                      <br />
                      <br />
                      Dịch vụ tư vấn phong thủy cải bệnh tại Dược Linh Các kết
                      hợp giữa kiến thức phong thủy truyền thống và nguyên lý
                      dưỡng sinh, nhằm gợi ý những điều chỉnh phù hợp trong
                      không gian sống, giúp khí vận được hài hòa, hỗ trợ quá
                      trình điều dưỡng và phục hồi sức khỏe.
                      <br />
                      Đây là giải pháp đồng hành cùng liệu trình điều trị, dựa
                      trên triết lý “thiên nhân hợp nhất” — con người sống thuận
                      theo tự nhiên sẽ có nền tảng vững chắc để duy trì sự an
                      hòa lâu dài.
                    </div>
                  </ScrollPaper>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Item 4: PHƯƠNG PHÁP Y HỌC CỔ TRUYỀN */}
          <div className="w-full flex flex-col items-center md:block">
            {/* Title */}
            <div className="relative md:absolute flex items-center justify-center md:top-[2663px] w-full max-w-[572px] aspect-[572/193] md:left-1/2 md:-translate-x-1/2 mb-4 md:mb-0">
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
                <span className="text-[20px] md:text-[40.5px]">
                  PHƯƠNG PHÁP Y HỌC CỔ TRUYỀN
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:block w-full items-center gap-6 md:gap-0">
              {/* Image (Mobile Order 2) */}
              <div className="relative md:absolute md:top-[2869px] w-[60%] max-w-[443px] aspect-[443/481] md:left-1/2 md:translate-x-[74px] md:order-none">
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

              {/* Text (Mobile Order 3) */}
              <div className="relative md:absolute z-0 md:top-[2954px] w-full max-w-[539px] md:h-[357px] md:left-1/2 md:-translate-x-[509px] flex items-center md:order-none">
                <Reveal dir="left" delay={150} width="w-full">
                  <ScrollPaper>
                    <div
                      className={`${beVietnamPro.className} text-[#5A3410] text-justify text-[12px] md:text-[15px] leading-[1.6] md:leading-[1.6] font-normal`}
                    >
                      Y học cổ truyền là kho tàng tri thức được đúc kết qua
                      nhiều thế hệ, dựa trên nguyên lý âm dương, ngũ hành và sự
                      cân bằng giữa con người với tự nhiên. Các phương pháp như
                      châm cứu, bấm huyệt, xoa bóp, dùng dược liệu... đều hướng
                      đến việc điều hòa khí huyết, khơi thông kinh lạc và nâng
                      cao khả năng tự chữa lành của cơ thể.
                      <br />
                      <br />
                      Khác với việc chỉ tập trung điều trị triệu chứng, Y học cổ
                      truyền chú trọng tìm hiểu căn nguyên gốc rễ của bệnh tật,
                      từ đó xây dựng phác đồ phù hợp với thể trạng riêng của
                      từng người.
                      <br />
                      Tại Dược Linh Các, các phương pháp cổ truyền được kế thừa
                      và vận dụng một cách linh hoạt, kết hợp kinh nghiệm gia
                      truyền nhiều đời với sự thấu hiểu thể trạng người Việt,
                      nhằm mang lại hiệu quả chăm sóc sức khỏe bền vững và toàn
                      diện.
                    </div>
                  </ScrollPaper>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
