import Banner from '../components/Banner';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <Banner title="404 - Not found" type="is-fullheight-with-navbar">
      <Button
        title="Go home"
        type="is-white is-outlined is-medium"
        icon="fas fa-home"
      ></Button>
    </Banner>
  );
};

export default NotFound;
