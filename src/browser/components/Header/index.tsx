import React from 'react';
import {
    Box,
    Flex,
    Image,
    Text,
    VStack
} from '@chakra-ui/react';
import swLogo from '../../assets/vectors/star-wars.svg';


export default function Header() {
    // test serverless git pipeline
    return (
        <Flex justify="center">
            <VStack
                justify="center"
            >
                <Box
                    w={400}
                >
                    <Image
                        px={"30%"}
                        src={swLogo}
                        my={-12}
                    />
                </Box>
                <Text
                    textAlign="center"
                >
                    Character Search
                </Text>
            </VStack>

        </Flex>
    );
}
