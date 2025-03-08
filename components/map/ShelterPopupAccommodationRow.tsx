import { FC, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ShelterPopupAccommodationRowProps {
  icon: IconDefinition;
  text: string;
  iconColor?: string;
}

const ShelterPopupAccommodationRow: FC<ShelterPopupAccommodationRowProps> =
  memo(function ShelterPopupAccommodationRow({
    icon,
    text,
    iconColor = 'text-green-500',
  }) {
    return (
      <p className="flex items-center gap-1">
        <FontAwesomeIcon icon={icon} className={`h-3 w-3 ${iconColor}`} />
        {text}
      </p>
    );
  });

export default ShelterPopupAccommodationRow;
