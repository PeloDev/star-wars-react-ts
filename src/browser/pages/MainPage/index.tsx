import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Center,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Text
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import swLogo from '../../assets/vectors/star-wars.svg';
import SWScrollingText from '../../components/SWScrollingText';
import { starWarsScrollBG } from '../../styles';
import Header from '../../components/Header';
import { fetchCharacterImgByIdx } from 'src/browser/helpers';
import tempImg from '../../assets/images/characters/r2d2.png';
import { AppContext } from '../../core/app-context';

interface IProps {
    page?: number;
}

export default function MainPage({ page = 1 }: IProps) {

    const [showScrollingText, setShowScrollingText] = useState(true);
    const [mainImg, setMainImg] = useState("");

    const [appState, dispatch] = useContext(AppContext);

    useEffect(() => {
        const imgSrc = `../assets/images/characters/${fetchCharacterImgByIdx(0).toString()}`;
        console.log(imgSrc);
        setMainImg(imgSrc);
        if (appState.mainPage.pageNum === 1) {
            dispatch({
                type: "mainPageNext"
            });
            console.log("Changed Page to 2");
        }
    }, []);

    useEffect(() => {
        console.log(appState);
    }, [appState]);

    return (
        <Box {...starWarsScrollBG}>
            {
                showScrollingText
                    ? <SWScrollingText
                        onAnimationEnd={() => { setShowScrollingText(false) }}
                    />
                    : <Box
                        minH="100vh"
                    >
                        <Header />
                        <Box
                            p={6}
                        >
                            <Flex
                            >
                                <Image
                                    w={240}
                                    h={240}
                                    fit="contain"
                                    src={tempImg}
                                    pos="relative"
                                    animation="driftInSpace infinite 8s linear"
                                />
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<MdSearch color="grey" />}
                                    />
                                    <Input
                                        _focus={{ borderColor: "swYellow" }}
                                        color="#ffc909"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </InputGroup>
                            </Flex>
                        </Box>
                    </Box>
            }

        </Box>
    );
}
