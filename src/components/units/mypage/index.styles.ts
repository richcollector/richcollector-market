import styled from '@emotion/styled';
import { Phone, Monitor } from '../../../commons/styles/globalStyles';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;

	width: 1320px;
	border-radius: 10px;

	margin: 50px 0px;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 500px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 767px;
	}
`;

export const BlankBox = styled.div`
	position: relative;
	height: 100%;
	@media screen and (max-width: ${Phone - 1}px) {
		display: none;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		display: none;
	}
`;
