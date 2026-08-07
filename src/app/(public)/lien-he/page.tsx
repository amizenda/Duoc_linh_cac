import type { Metadata } from 'next';
import { ContactForm } from './ui';
import { Be_Vietnam_Pro } from 'next/font/google';
import Image from 'next/image';
import localFont from 'next/font/local';
import backgroundImage from '@/assets/background/background-lienhe.png';
import titleBanner from '@/assets/banner/title-banner.png';
import logoVector from '@/assets/logo/logo-vector.png';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Gửi thông tin liên hệ tới Dược Linh Các.',
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

export default function ContactPage() {
  return (
    <div className="">
      <div className="w-full">
        <section className="relative w-full overflow-hidden bg-[#4D0000]/90 md:min-h-[950px]">
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

          <div className="relative z-10 flex flex-col items-center pb-12 md:pb-20">
            {/* Title Banner */}
            <div className="relative flex items-center justify-center p-4 md:p-8 md:ml-4 w-[284px] h-[160px] md:w-[568.61px] md:h-[319.84px] mt-6 md:mt-[25px] shrink-0">
              <Image
                src={titleBanner}
                alt="Title Banner"
                fill
                className="object-contain -z-10"
                priority
              />
              <h1
                className={`${bigShouldersDisplay.className} text-center uppercase lg:text-[42px]`}
                style={{
                  fontSize: 'clamp(20px, 5vw, 42px)',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-0.03em',
                  color: '#FDE3B1',
                }}
              >
                LIÊN HỆ
              </h1>
            </div>

            {/* Main Content Area */}
            <div
              className={`w-full max-w-[1440px] flex flex-col md:flex-row justify-center px-4 gap-8 md:gap-[81px] mt-6 md:mt-[35px] ${beVietnamPro.className}`}
            >
              {/* Left Column: Text Info */}
              <div className="w-full md:w-[430px] md:mt-[0px] flex flex-col text-[#FFE7B6]">
                <div className="relative mb-4">
                  <div
                    className="absolute"
                    style={{
                      width: '36px',
                      height: '70.99px',
                      left: '13px',
                      top: '-20px',
                    }}
                  >
                    <Image
                      src={logoVector}
                      alt="Logo Vector"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2
                    className={`${bigShouldersDisplay.className} font-bold text-[#FFF017] text-[28px] md:text-[48px] leading-tight md:leading-[53px] `}
                    style={{ marginLeft: '62px' }}
                  >
                    DƯỢC LINH CÁC
                  </h2>
                </div>

                <p
                  className="mb-6 md:mb-[40px] text-[14px] md:text-[16px] font-normal leading-[20px] mt-4 lg:mt-0"
                  style={{ textAlign: 'justify' }}
                >
                  Mọi thắc mắc quý khách hàng vui lòng liên hệ tới chúng tôi
                  thông qua thông tin bên dưới hoặc quý khách có thể điền thông
                  tin ở form bên cạnh. Chúng tôi sẽ liên hệ giải đáp thắc mắc
                  tới quý khách một cách sớm nhất.
                </p>

                <div className="flex flex-col gap-[9px] text-[14px] md:text-[16px] leading-[20px]">
                  <div className="flex items-center">
                    <span className="font-bold">Tư vấn:&nbsp;</span>
                    <span>0366659999</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Email:&nbsp;</span>
                    <span>duoclinhcac@gmail.com</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[75px] font-bold">Địa chỉ:</span>
                    <div className="flex flex-col gap-[20px]">
                      <p>
                        290/2 Nam kì Khởi Nghĩa, phường Võ Thị Sáu, Quận 3,
                        TP.HCM
                      </p>
                      <p>71 Phan Đăng Lưu, phường Suối Hoa, Bắc Ninh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="w-full md:w-[671px]">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
