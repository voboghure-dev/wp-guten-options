import { __ } from "@wordpress/i18n";
import api from "@wordpress/api";
import { render, Component, useState, useEffect } from "@wordpress/element";
import Notices from "./notices";
import { dispatch } from "@wordpress/data";
import {
	Button,
	Icon,
	Panel,
	PanelBody,
	PanelRow,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	TabPanel,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import "./admin.scss";

const App = () => {
	const [optionSelect, setOptionSelect] = useState("");
	const [optionText, setOptionText] = useState("");
	const [optionText2, setOptionText2] = useState("");
	const [optionText3, setOptionText3] = useState("");
	const [optionToggle, setOptionToggle] = useState(false);
	const [isAPILoaded, setIsAPILoaded] = useState(false);

	useEffect(() => {
		api.loadPromise.then(() => {
			const settings = new api.models.Settings();

			if (isAPILoaded === false) {
				settings.fetch().then((response) => {
					setOptionSelect(response["wp_guten_options_select"]);
					setOptionText(response["wp_guten_options_text"]);
					setOptionText2(response["wp_guten_options_text_2"]);
					setOptionText3(response["wp_guten_options_text_3"]);
					setOptionToggle(response["wp_guten_options_toggle"]);
					setIsAPILoaded(true);
				});
			}
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const settings = new api.models.Settings({
			["wp_guten_options_select"]: optionSelect,
			["wp_guten_options_text"]: optionText,
			["wp_guten_options_text_2"]: optionText2,
			["wp_guten_options_text_3"]: optionText3,
			["wp_guten_options_toggle"]: optionToggle ? "true" : "",
		});
		settings.save();

		dispatch("core/notices").createNotice(
			"success",
			__("Settings Saved", "wp-guten-options"),
			{
				type: "snackbar",
				isDismissible: true,
			}
		);
	};

	if (!isAPILoaded) {
		return (
			<Placeholder>
				<Spinner />
			</Placeholder>
		);
	}

	return (
		<>
			<div className="wp-guten-options__header">
				<div className="wp-guten-options__container">
					<div className="wp-guten-options__title">
						<h1>
							{__("Guten Options Settings", "wp-guten-options")}{" "}
							<Icon icon="admin-plugins" />
						</h1>
					</div>
				</div>
			</div>

			<div className="wp-guten-options__main">
				<TabPanel
					className="my-tab-panel"
					activeClass="active-tab"
					orientation="horizontal"
					initialTabName="tab2"
					onSelect={(tabName) => console.log("Selecting tab", tabName)}
					tabs={[
						{
							name: "tab1",
							title: "Tab 1",
							className: "tab-one",
						},
						{
							name: "tab2",
							title: "Tab 2",
							className: "tab-two",
						},
					]}
				>
					{(tab) => (
						<PanelBody>
							<p>{tab.title}</p>
							<NumberControl
								onChange={(e) => console.log(e)}
								isDragEnabled
								isShiftStepEnabled
								shiftStep={10}
								step={10}
								value={10}
							/>
						</PanelBody>
					)}
				</TabPanel>

				<Panel>
					<PanelBody
						title={__("Panel Body One", "wp-guten-options")}
						icon="admin-plugins"
					>
						<SelectControl
							help={__("An example dropdown field.", "wp-guten-options")}
							label={__("Example Select", "wp-guten-options")}
							onChange={(optionSelect) => setOptionSelect(optionSelect)}
							options={[
								{
									label: __("Please Select...", "wp-guten-options"),
									value: "",
								},
								{
									label: __("Option 1", "wp-guten-options"),
									value: "option-1",
								},
								{
									label: __("Option 2", "wp-guten-options"),
									value: "option-2",
								},
							]}
							value={optionSelect}
						/>
					</PanelBody>
					<PanelBody
						title={__("Panel Body Two", "wp-guten-options")}
						icon="admin-plugins"
					>
						<TextControl
							help={__("This is an example text field.", "wp-guten-options")}
							label={__("Example Text", "wp-guten-options")}
							onChange={(optionText) => setOptionText(optionText)}
							value={optionText}
						/>
					</PanelBody>
					<PanelBody
						title={__("Panel Body Three", "wp-guten-options")}
						icon="admin-plugins"
					>
						<PanelRow>
							<TextControl
								help={__(
									"Use PanelRow to place controls inline.",
									"wp-guten-options"
								)}
								label={__("Example Text 2", "wp-guten-options")}
								onChange={(optionText2) => setOptionText2(optionText2)}
								value={optionText2}
							/>
							<TextControl
								help={__("This control is inline.", "wp-guten-options")}
								label={__("Example Text 3", "wp-guten-options")}
								onChange={(optionText3) => setOptionText3(optionText3)}
								value={optionText3}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody
						title={__("Panel Body Four", "wp-guten-options")}
						icon="admin-plugins"
					>
						<ToggleControl
							checked={optionToggle}
							help={__("An example toggle.", "wp-guten-options")}
							label={__("Example Toggle", "wp-guten-options")}
							onChange={(optionToggle) => setOptionToggle(optionToggle)}
						/>
					</PanelBody>
					<Button
						isPrimary
						// isLarge
						onClick={handleSubmit}
					>
						{__("Save", "wp-guten-options")}
					</Button>
				</Panel>
			</div>

			<div className="wp-guten-options__notices">
				<Notices />
			</div>
		</>
	);
};

document.addEventListener("DOMContentLoaded", () => {
	const htmlOutput = document.getElementById("wp-guten-options-settings");

	if (htmlOutput) {
		render(<App />, htmlOutput);
	}
});
