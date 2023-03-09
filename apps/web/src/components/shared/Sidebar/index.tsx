import Section from './Section';
import Title from './Section/Title';
import Item from './Section/Item';
import styles from './index.module.scss';
import SidebarSearchBar from './Search';

export default function Sidebar() {
  return (
    <nav className={styles.Container}>
      <SidebarSearchBar />
      <Section>
        <Title>Discover</Title>
        <Item path="/">Listen Now</Item>
        <Item path="/browse">Browse</Item>
        <Item path="/radio">Radio</Item>
      </Section>
      <Section>
        <Title>Library</Title>
        <Item path="/library/recent">Recently Added</Item>
        <Item path="/library/artists">Artists</Item>
        <Item path="/library/albums">Albums</Item>
        <Item path="/library/tracks">Tracks</Item>
        <Item path="/library/genres">Genres</Item>
        <Item path="/library/composers">Composers</Item>
        <Item path="/library/for-you">Made For You</Item>
      </Section>
      <Section>
        <Title>Playlists</Title>
        <Item path="/library/playlists">All Playlists</Item>
        {/* Todo: Show my playlists */}
      </Section>
    </nav>
  );
}
