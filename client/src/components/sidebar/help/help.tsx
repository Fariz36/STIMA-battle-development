import React from 'react'
import { SectionHeader } from '../../section-header'
import { BATTLECODE_YEAR } from '../../../constants'

enum TabType {
    NONE = '',
    HOTKEYS = 'Hotkeys'
}

interface Props {
    open: boolean
}

export const HelpPage: React.FC<Props> = (props) => {
    const [openTabType, setOpenTabType] = React.useState(TabType.HOTKEYS)

    const toggleTab = (newType: TabType) => {
        setOpenTabType(newType == openTabType ? TabType.NONE : newType)
    }

    const hotkeyElement = (key: string, description: string) => {
        return (
            <div>
                <div className="font-bold">{key}</div>
                <div>{description}</div>
            </div>
        )
    }

    if (!props.open) return null

    const sections: Record<TabType, JSX.Element> = {
        [TabType.NONE]: <></>,
        [TabType.HOTKEYS]: (
            <div className="flex flex-col gap-[10px]">
                {hotkeyElement(`Space`, 'Pauses / Unpauses game')}
                {hotkeyElement(
                    `LeftArrow and RightArrow`,
                    'Controls speed if game is unpaused, or moves the current round/turn if paused'
                )}
                {hotkeyElement(`\` and 1`, 'Scroll through Game, Runner, and Queue')}
                {/*
                {hotkeyElement(
                    `Shift`,
                    'Switches to Queue tab. If you are already on it, prompts you to select a replay file'
                )}
                */}
                {hotkeyElement(
                    `Ctrl/⌘ + O`,
                    'If you are on the queue tab, prompts you to select a replay file. Otherwise, opens the queue tab.'
                )}
                {hotkeyElement(`R`, 'Resets the map camera if it has been panned/zoomed')}
                {hotkeyElement(`C`, 'Hides and unhides game control bar')}
                {hotkeyElement(`F`, 'Toggles the show all indicators config')}
                {hotkeyElement(`T`, 'Toggles per-turn playback for the current game')}
                {hotkeyElement(`F`, 'Toggles per-turn robot focus config')}
                {hotkeyElement(`.`, 'Skip to the very last round of the current game')}
                {hotkeyElement(`,`, 'Skip to the first round of the current game')}
            </div>
        )
    }

    return (
        <div className="pb-5">
            {Object.getOwnPropertyNames(sections).map((tabType) => {
                if (tabType == TabType.NONE) return null
                return (
                    <SectionHeader
                        key={tabType}
                        title={tabType}
                        open={tabType == openTabType}
                        onClick={() => toggleTab(tabType as TabType)}
                        titleClassName="py-2"
                    >
                        <div className="pl-3 text-xs">{sections[tabType as TabType]}</div>
                    </SectionHeader>
                )
            })}
        </div>
    )
}
