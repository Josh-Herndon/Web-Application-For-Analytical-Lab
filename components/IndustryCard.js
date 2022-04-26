import Link from 'next/link';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import waterImg from '../public/water.jpg';
import paperImg from '../public/paper.jpg';
import leatherImg from '../public/leather.jpg';
import pchemImg from '../public/p-chem.jpg';

export default function IndustryCard({ industry }) {
  const industryObj = {'water': waterImg, 'paper': paperImg, 'leather': leatherImg, 'p-chem': pchemImg};

  return (
      <Col>
        <Link href={`/${industry}/rlws`}>
          <a>
            <Card border='dark'>
              <Image src={industryObj[industry]} width='200' height='200' alt={`${industry}`} />
              <Card.Body>
                <Card.Title>{industry === 'p-chem' ? 'Other': `${industry[0].toUpperCase()}${industry.slice(1)}`}</Card.Title>
                <hr />
                <Card.Text>
                  Access requests from {industry === 'p-chem' ? 'other industries': `the ${industry} industry`}.
                </Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Link>
      </Col>
  );
}