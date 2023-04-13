import * as React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MDEditor from "@uiw/react-md-editor"

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0)
    const [markDownValue, setMarkDownValue] = React.useState("type proposal here ....")
    const [previewValue, setPreviewValue] = React.useState("preview")

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleMarkDownChange = (event, newValue) => {
        setMarkDownValue(newValue)
    }
    const handlePreviewChange = (event, newValue) => {
        setPreviewValue(newValue)
    }

    return (
        <Box sx={{ width: "70%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Mark Down" {...a11yProps(0)} />
                    <Tab label="Preview " {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} onChange={handleMarkDownChange} index={0}>
                <MDEditor value={markDownValue} onChange={handleMarkDownChange} />
            </TabPanel>
            <TabPanel value={value} onChange={handlePreviewChange} index={1}>
                <MDEditor.Markdown source={markDownValue} />
            </TabPanel>
        </Box>
    )
}
