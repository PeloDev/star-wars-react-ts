import React, { useState } from 'react';
import {
    Box,
    Center,
    Flex,
    Image,
    Text
} from '@chakra-ui/react';
import SWScrollingText from 'src/browser/components/SWScrollingText';
import { starWarsScrollBG } from 'src/browser/styles';
import swLogo from '../../assets/vectors/star-wars.svg';
import Header from 'src/browser/components/Header';

export default function MainPage() {

    const [showScrollingText, setShowScrollingText] = useState(true);

    return (
        <Box {...starWarsScrollBG}>
            {
                showScrollingText
                    ? <SWScrollingText
                        onAnimationEnd={() => { setShowScrollingText(false) }}
                    />
                    : <Box
                        minH="100vh"
                        p={6}
                    >
                        <Header />
                    </Box>
            }

        </Box>
    );
}
