import React, { useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import DefaultAssetImage from "../../../assets/images/default-asset-image.png";
import TableHead from "components/UiElements/Table/TableHead";
import TableBody from "components/UiElements/Table/TableBody";
import Dropdown from "components/UiElements/Dropdown/Dropdown";
import Button from "components/UiElements/Button/Button";
import TableRow from "components/UiElements/Table/TableRow";
import axios from "axios";
import "./DigitalAssets.style.scss";
import { endpointDigitalAssets } from "config";

const PAGE_LIMIT = 10;

const fetchInfiniteDigitalAssets = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${endpointDigitalAssets.GET_ALL_ASSETS}?page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return data;
};

const DigitalAssets: React.FC = () => {
  const loadMoreButtonRef = React.createRef<HTMLButtonElement>();
  const [sorting, setSorting] = useState<"" | "ASC" | "DESC">("");

  const {
    isLoading,
    isError,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery("infiniteDigitalAssets", fetchInfiniteDigitalAssets, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length + 1 : false,
    // cacheTime: 60 * 60,
    // staleTime: Infinity
  });

  const sortedDataToRender = useMemo(() => {
    if (!isLoading && !isFetchingNextPage && data && data.pages.length) {
      let dataToReturn: string | any[] = [];
      data.pages.map((item) => {
        dataToReturn = dataToReturn.concat(item.data);
        return [];
      });

      if (dataToReturn.length > 0) {
        if (sorting === "ASC") {
          dataToReturn.sort((a, b) => sortName(a, b));
        }
        if (sorting === "DESC") {
          dataToReturn.sort((a, b) => sortName(b, a));
        }
      }
      return dataToReturn;
    }
    return null;
    // eslint-disable-next-line
  }, [data, sorting]);

  console.log("Sorted", sortedDataToRender);

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div style={{ textAlign: "center", fontSize: 20 }}>
        There is some error fetching data
      </div>
    );

  return (
    <div>
      <div className="digital-assets">
        <TableHead>
          <thead>
            <tr>
              <td>
                <div
                  onClick={() =>
                    setSorting((prev) => {
                      if (prev === "ASC") {
                        return "DESC";
                      }
                      return "ASC";
                    })
                  }
                  className={`_title _sortable ${sorting !== "" && "_sorted"}`}
                >
                  Name
                  {sorting === "ASC" || sorting === "" ? (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="sort-amount-up-alt"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.39-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="sort-amount-down-alt"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352z"
                      ></path>
                    </svg>
                  )}
                </div>
              </td>
              <td>
                <div className="_title">Symbol</div>
              </td>
              <td>
                <div className="_title">Price</div>
              </td>
              <td></td>
            </tr>
          </thead>
          <TableBody>
            {sortedDataToRender &&
              sortedDataToRender.map((item) => (
                <TableRow
                  key={item.id}
                  rowData={[
                    <div className="_icon">
                      <div className="_img">
                        {item.profile &&
                        item.profile.general &&
                        item.profile.general.background.issuing_organizations &&
                        item.profile.general.background &&
                        item.profile.general.background.issuing_organizations
                          .length &&
                        item.profile.general.background.issuing_organizations[0]
                          .logo ? (
                          <img
                            src={
                              item.profile.general.background
                                .issuing_organizations[0].logo
                            }
                            alt={item.name ? item.name : ""}
                          />
                        ) : (
                          <img
                            src={DefaultAssetImage}
                            alt={item.name ? item.name : ""}
                          />
                        )}
                      </div>
                      <div className="_name">{item.name && item.name}</div>
                    </div>,
                    <div className="_symbol">{item.symbol && item.symbol}</div>,
                    <div className="_price">
                      USD{" "}
                      {item.metrics &&
                        item.metrics.market_data &&
                        item.metrics.market_data.price_usd &&
                        (+item.metrics.market_data.price_usd).toFixed(2)}
                    </div>,
                    <Dropdown title="Actions">
                      <div className="_action-content">
                        <Button
                          size="small"
                          type="button"
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            console.log("onClick BUY for ", item?.name)
                          }
                        >
                          Buy
                        </Button>
                        <Button
                          size="small"
                          type="button"
                          color="danger"
                          variant="outlined"
                          onClick={() =>
                            console.log("onClick SELL for ", item?.name)
                          }
                        >
                          Sell
                        </Button>
                      </div>
                    </Dropdown>,
                  ]}
                />
              ))}
          </TableBody>
        </TableHead>
      </div>
      <div className="load-more">
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          className="button outlined"
          disabled={isFetchingNextPage || isLoading || !hasNextPage}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default DigitalAssets;

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="_loading-item" />
      <div className="_loading-item" />
      <div className="_loading-item" />
      <div className="_loading-item" />
      <div className="_loading-item" />
      <div className="_loading-item" />
      <div className="_loading-item" />
      <div className="_loading-item" />
    </div>
  );
};

const sortName = (a: any, b: any) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
