import React from "react";
import NextLink from "next/link";
import { Link, Flex, Box, Text, SimpleGrid, Heading } from "@chakra-ui/react";

const SERVER_HOST = 'http://localhost:3001'

interface BookProps {
    book: {
      data: {
        id: string;
        title: string;
        description: string;
        author: string;
      }
    }
}

const Book: React.FC<BookProps> = ({book}) => {
    const data = book.data;

    return (
      <Box>
        <Flex flexDirection="column" alignItems="center">
          <Heading marginY="2rem" as="h1">Book</Heading>
          <SimpleGrid columns={2} width="2xs" spacingY={4}>
            <Text fontWeight="bold" marginRight={4}>
              Title
            </Text>
            <Text>{data.title}</Text>
  
            <Text fontWeight="bold" marginRight={4}>
              Author
            </Text>
            <Text>{data.author}</Text>
  
            <Text fontWeight="bold" marginRight={4}>
              Description
            </Text>
            <Text>{data.description}</Text>
          </SimpleGrid>
          <NextLink href="/">
            <Link marginY="2rem">
              <Text fontStyle="italic">Go back home</Text>
            </Link>
          </NextLink>
        </Flex>
      </Box>
    );
}

export async function getStaticPaths() {
    const response = await fetch(`${SERVER_HOST}/v1/books`)
    const books = await response.json();
    const paths = books.data.map((book: { id: any; }) => ({
      params: {id: `${book.id}`},
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({params}: any) {
    const response = await fetch(`${SERVER_HOST}/v1/books/${params.id}`);
    const book = await response.json();
    return {
      props: { book }
    }
}

export default Book