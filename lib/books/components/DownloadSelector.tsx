'use client';

interface DownloadSelectorProps {
  formats: Record<string, string>;
}

export function DownloadSelector({ formats }: DownloadSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      window.open(e.target.value, '_blank', 'noopener,noreferrer');
      e.target.value = '';
    }
  };

  const filteredFormats = Object.entries(formats).filter(
    ([format]) => !format.includes('image/')
  );

  return (
    <select
      className="max-w-md rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        Selecciona un formato
      </option>
      {filteredFormats.map(([format, url]) => {
        const formatName = format.split("/").pop() || format;
        return (
          <option key={format} value={url}>
            {formatName}
          </option>
        );
      })}
    </select>
  );
}
