import Link from 'next/link';

/** TODO: Build this component */
export default function ShelterList() {
  const tempShelters = [
    { id: 1, name: 'UCLA Animal Shelter', location: 'Westwood' },
    { id: 2, name: 'Boelter Shelter', location: 'Westwood' },
    { id: 3, name: 'Westwood Shelter', location: 'Westwood' },
  ];

  return (
    <div>
      <h1 className="mb-4 px-4 text-2xl font-bold text-gray-400">
        ShelterList functionality
      </h1>
      <div className="space-y-4 px-4">
        {tempShelters.map((shelter) => (
          <div
            key={shelter.id}
            className="rounded-lg border-2 border-gray-900 p-4 text-gray-600"
          >
            <Link href={`/shelters/${shelter.id}`}>
              <h2 className="text-xl font-semibold">{shelter.name}</h2>
              <p>{shelter.location}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
