import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Page } from './Paginations.styles';
import type { IPaginationsProps } from './Paginations.types';

export default function PaginationsUI(props: IPaginationsProps): JSX.Element {
	const [startPage, setStartPage] = useState(1);
	const [activedPage, setActivedPage] = useState(1);
	const lastPage = Math.ceil((props.count ?? 10) / 10);

	const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
		const activedPage = Number(event.currentTarget.id);
		setActivedPage(activedPage);

		if (props.bigMenu === '1') {
			switch (props.menu) {
				case '1':
					void props.refetch?.({ page: activedPage });
					return;

				case '2':
					void props.pickRefetch?.({ page: activedPage });
			}
		} else if (props.bigMenu === '2') {
			switch (props.menu) {
				case '1':
					void props.pointRefetch?.({ page: activedPage });
					return;

				case '2':
					void props.loadingRefetch?.({ page: activedPage });
					return;

				case '3':
					void props.sellingRefetch?.({ page: activedPage });
					return;

				case '4':
					void props.sellingRefetch?.({ page: activedPage });
			}
		}
	};

	const onClickPrevPage = (): void => {
		if (startPage === 1) return;
		setStartPage(startPage - 10);
		setActivedPage(startPage - 10);

		if (props.bigMenu === '1') {
			switch (props.menu) {
				case '1':
					void props.refetch?.({ page: startPage - 10 });
					return;

				case '2':
					void props.pickRefetch?.({ page: startPage - 10 });
			}
		} else if (props.bigMenu === '2') {
			switch (props.menu) {
				case '1':
					void props.pointRefetch?.({ page: startPage - 10 });
					return;

				case '2':
					void props.loadingRefetch?.({ page: startPage - 10 });
					return;

				case '3':
					void props.sellingRefetch?.({ page: startPage - 10 });
					return;

				case '4':
					void props.sellingRefetch?.({ page: startPage - 10 });
			}
		}
	};

	const onClickNextPage = (): void => {
		if (startPage + 10 <= lastPage) {
			setStartPage(startPage + 10);
			setActivedPage(startPage + 10);

			if (props.bigMenu === '1') {
				switch (props.menu) {
					case '1':
						void props.refetch?.({ page: startPage + 10 });
						return;

					case '2':
						void props.pickRefetch?.({ page: startPage + 10 });
				}
			} else if (props.bigMenu === '2') {
				switch (props.menu) {
					case '1':
						void props.pointRefetch?.({ page: startPage + 10 });
						return;

					case '2':
						void props.loadingRefetch?.({ page: startPage + 10 });
						return;

					case '3':
						void props.sellingRefetch?.({ page: startPage + 10 });
						return;

					case '4':
						void props.sellingRefetch?.({ page: startPage + 10 });
				}
			}
		}
	};

	return (
		<div>
			<Page onClick={onClickPrevPage}>{`<`}</Page>
			{new Array(10).fill(1).map(
				(_, index) =>
					startPage + index <= lastPage && (
						<Page
							key={startPage + index}
							onClick={onClickPage}
							id={String(startPage + index)}
							isActive={startPage + index === activedPage}
						>
							{startPage + index}
						</Page>
					),
			)}
			<Page onClick={onClickNextPage}>{`>`}</Page>
		</div>
	);
}
