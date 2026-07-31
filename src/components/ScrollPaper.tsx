type ScrollPaperProps = {
  children: React.ReactNode;
  className?: string;
};

// Cuộn văn thư cổ: nền giấy da bò + 2 trục cuộn gỗ ở hai đầu, dựng hoàn
// toàn bằng CSS gradient/shadow nên co giãn tốt với mọi độ dài văn bản
// (không phụ thuộc ảnh raster cố định tỉ lệ).
export function ScrollPaper({ children, className = '' }: ScrollPaperProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Trục cuộn trái */}
      <div
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[calc(100%+14px)] w-[18px] md:w-[26px] rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #5A3410 0%, #8A5A28 22%, #C99A5C 45%, #8A5A28 68%, #5A3410 100%)',
          boxShadow:
            'inset 0 0 4px rgba(0,0,0,0.4), 2px 0 6px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[10px] md:h-[14px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, #4A2A0C 0%, #7A4E22 22%, #B98A50 45%, #7A4E22 68%, #4A2A0C 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[10px] md:h-[14px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, #4A2A0C 0%, #7A4E22 22%, #B98A50 45%, #7A4E22 68%, #4A2A0C 100%)',
          }}
        />
      </div>

      {/* Trục cuộn phải */}
      <div
        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 h-[calc(100%+14px)] w-[18px] md:w-[26px] rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #5A3410 0%, #8A5A28 22%, #C99A5C 45%, #8A5A28 68%, #5A3410 100%)',
          boxShadow:
            'inset 0 0 4px rgba(0,0,0,0.4), -2px 0 6px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[10px] md:h-[14px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, #4A2A0C 0%, #7A4E22 22%, #B98A50 45%, #7A4E22 68%, #4A2A0C 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[10px] md:h-[14px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, #4A2A0C 0%, #7A4E22 22%, #B98A50 45%, #7A4E22 68%, #4A2A0C 100%)',
          }}
        />
      </div>

      {/* Thân giấy */}
      <div
        className="relative mx-[9px] md:mx-[13px] px-6 py-6 md:px-10 md:py-8"
        style={{
          background:
            'linear-gradient(180deg, #F6E9C8 0%, #EFDEB0 50%, #F6E9C8 100%)',
          boxShadow:
            'inset 0 0 30px rgba(139,94,42,0.25), 0 6px 16px rgba(0,0,0,0.3)',
        }}
      >
        {/* Bóng mờ mép trên/dưới để gợi nếp giấy cuộn */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-3"
          style={{
            background:
              'linear-gradient(180deg, rgba(90,52,16,0.25), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3"
          style={{
            background:
              'linear-gradient(0deg, rgba(90,52,16,0.25), transparent)',
          }}
        />
        {children}
      </div>
    </div>
  );
}
