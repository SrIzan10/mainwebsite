import Image from "next/image";

export default function Collab() {
    return (
        <div>
            <Image src="/collab.webp" useMap="#image-map" alt="Collab image" />

            <map name="image-map">
                <area target="_blank" alt="Sr Izan" title="Sr Izan" href="https://srizan.dev" coords="0,0,280,316" shape="rect" />
                <area target="_blank" alt="Willysuna" title="Willysuna" href="https://willysuna.dev" coords="716,0,1050,317" shape="rect" />
                <area target="_blank" alt="Aleandro" title="Aleandro" href="https://www.youtube.com/watch?v=G7QME0bzZuA" coords="663,319,355,0" shape="rect" />
                <area target="_blank" alt="Nerticel" title="Nerticel" href="https://www.youtube.com/shorts/-uAZdIJIl8o" coords="1,340,307,633" shape="rect" />
                <area target="_blank" alt="Orchuna" title="Orchuna" href="https://www.tumblr.com/orchunaxd" coords="333,328,679,637" shape="rect" />
                <area target="_blank" alt="XaviXE" title="XaviXE" href="https://srizan.dev/xavixe" coords="761,403,1045,571" shape="rect" />
            </map>
            <p>click on each person haha yes </p>
        </div>
    )
}