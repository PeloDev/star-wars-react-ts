import React, { useState } from 'react';
import {
    Box,
    Center,
    Flex,
    Image,
    Text
} from '@chakra-ui/react';
import swLogo from '../../assets/vectors/star-wars.svg';
import SWScrollingText from '../../components/SWScrollingText';
import { starWarsScrollBG } from '../../styles';
import Header from '../../components/Header';

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
