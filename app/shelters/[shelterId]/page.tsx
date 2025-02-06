export default function ShelterDetails({ params }: { params: { shelterId: string }; }){
    return <h1>Shelter {params.shelterId} specifics</h1>
}