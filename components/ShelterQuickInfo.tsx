import { memo, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faWheelchair,
  faLocationDot,
  faUsers,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import type { Shelter } from '@prisma/client';
import Link from 'next/link';

interface ShelterQuickInfoProps {
  shelter: Shelter;
  className?: string;
}

const ShelterQuickInfo: FC<ShelterQuickInfoProps> = memo(
  function ShelterQuickInfo({ shelter, className = '' }) {
    return (
      <div
        className={`rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${className}`}
      >
        <h2 className="text-xl font-semibold text-gray-900">{shelter.name}</h2>

        <div className="mt-3 flex items-start gap-2 text-gray-600">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="mt-1 h-4 w-4 shrink-0"
          />
          <p>
            {shelter.address.street}, {shelter.address.city},{' '}
            {shelter.address.state} {shelter.address.zipCode}
          </p>
        </div>

        {shelter.evacueeCapacity && (
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
            <p>Capacity: {shelter.evacueeCapacity} evacuees</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {shelter.foodProvided && (
            <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              <span>Food</span>
            </div>
          )}
          {shelter.waterProvided && (
            <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              <span>Water</span>
            </div>
          )}
          {shelter.wheelchairAccessible && (
            <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
              <FontAwesomeIcon icon={faWheelchair} className="h-3.5 w-3.5" />
              <span>Accessible</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Link href={`/shelters/${shelter.id}`}>
            <button className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600">
              View Details
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
      </div>
    );
  },
);

export default ShelterQuickInfo;
