import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Center,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    Text,
    VStack
} from '@chakra-ui/react';
import { starWarsScrollBG } from 'src/browser/styles';
import { fetchPerson } from 'src/browser/core/api';
import { ICharacter } from 'src/browser/interfaces';
import { AppContext } from 'src/browser/core/app-context';
import { BiPlanet } from 'react-icons/bi';
import { RiGenderlessLine } from 'react-icons/ri';
import { GiBodyHeight, GiFemale, GiLightSabers, GiMale, GiWeight } from 'react-icons/gi';
import { IconType } from 'react-icons';
import crossingSabersImg from '../../assets/images/crossing-light-sabers.png';
import { MdNavigateBefore } from 'react-icons/md';

interface IProps {
    characterID: string;
}

export default function CharacterProfilePage({ characterID }: IProps) {

    const [appState, dispatch] = useContext(AppContext);
    // const [characterImg, setCharacterImg] = useState<string>("");
    const [character, setCharacter] = useState<ICharacter | undefined>(undefined);

    useEffect(() => {
        console.log('character id:');
        console.log(characterID);
        dispatch({
            type: "setLoading"
        });
        fetchPerson(characterID)
            .then(result => {
                setCharacter(result);
            })
            .catch(e => console.log(e))
            .finally(() => {
                dispatch({
                    type: "unsetLoading"
                });
            });
    }, []);

    useEffect(() => {
        console.log(character);
    }, [character])

    return (
        <VStack
            minH="100vh"
            p={6}
            {...starWarsScrollBG}
        >
            <Flex
                justifyContent="space-between"
                w="100%"
            >
                <Box
                    w="60px"
                >
                    <Link
                        href="/"
                    >
                        <MdNavigateBefore color="#ffc909" size={30} />
                    </Link>
                </Box>
                <Text
                    my={1}
                    letterSpacing={2}
                    fontWeight={300}
                    textAlign="center"
                >
                    Character Profile
                </Text>
                <Box w="60px" />
            </Flex>
            <Text
                my={1}
                fontSize={36}
                fontWeight={700}
                textAlign="center"
            >
                {character?.name}
            </Text>
            {
                character &&
                Object.keys(character)
                    .filter((charKey) => charKey !== 'id' && charKey !== 'homeworld' && charKey !== 'name')
                    .map((charKey, charKeyIdx) => {
                        let fieldName = charKey === 'homeworldOb' ? 'homeworld' : charKey;
                        let FieldIcon: IconType = GiLightSabers, measure = "";
                        switch (fieldName) {
                            case "height":
                                measure = "cm";
                                FieldIcon = GiBodyHeight;
                                break;
                            case "mass":
                                measure = "kg";
                                FieldIcon = GiWeight;
                                break;
                            case "gender":
                                measure = "";
                                FieldIcon = character.gender === "male"
                                    ? GiMale
                                    : character.gender === "female"
                                        ? GiFemale
                                        : RiGenderlessLine;
                                break;
                            case "homeworld":
                                measure = "";
                                FieldIcon = BiPlanet;
                                break;
                        }
                        return (
                            <Box
                                key={`character-profile-${characterID}-${fieldName}`}
                                my={6}
                            >
                                <Center>
                                    <FieldIcon size={30} color="#ffc909" />
                                </Center>
                                <Grid
                                    templateColumns="repeat(12, 1fr)"
                                    gap={4}
                                    fontSize={[14, 15, 16]}
                                >
                                    <GridItem colSpan={5}>
                                        <Text
                                            textAlign="right"
                                            textTransform="capitalize"
                                            fontWeight={300}
                                        >
                                            {fieldName}
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Text textAlign="center">:</Text>
                                    </GridItem>
                                    <GridItem colSpan={5}>
                                        <Text
                                            textAlign="left"
                                        >
                                            {charKey === 'homeworldOb' ? character[charKey as keyof ICharacter].name : character[charKey as keyof ICharacter]}
                                            {measure}
                                        </Text>
                                    </GridItem>
                                </Grid>
                            </Box>
                        );
                    })
            }
            <Image
                w="100vw"
                px={"10%"}
                fit="contain"
                pos="relative"
                top={"-12vw"}
                src={crossingSabersImg}
            />
        </VStack>
    );
}
