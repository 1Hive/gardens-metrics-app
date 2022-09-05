import { RADIUS, useViewport, GU, useTheme } from "@1hive/1hive-ui";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import styled from "styled-components";
import { useSigner } from "wagmi";
import { AppScreen } from "~/components/AppLayout/AppScreen";
import { SmoothDisplayContainer } from "~/components/SmoothDisplayContainer";
import { fetchGardensEntries } from "~/utils/server/subgraph.server";
import { map } from "public/aragon-ui/types";

export const loader: LoaderFunction = async () => {
  const gardensData = await fetchGardensEntries();

  // console.log(gardensData);

  return json({ gardensData });
};

export default function Home() {
  const { gardensData } = useLoaderData();
  const { below } = useViewport();
  const theme = useTheme();
  const [{ data }] = useSigner();

  // const parseGardensData = gardensData[0].outflows;

  const entries = gardensData[0].outflows.map((garden: any) =>
    Object.values(garden)
  );

  console.log(entries);

  return (
    <AppScreen>
      <SmoothDisplayContainer>
        <h1>Data Fetch Example</h1>
        <h2>Outflows Data Querie:</h2>
        <br />
        {/* {parseGardensData.map((garden: any) => (
          <p>hello</p>
        ))} */}

        {entries.map((entry) => (
          <>
            <p>{entry[0]}</p>
            <p>{entry[1]}</p>
            <p>{entry[2]}</p>
            <p>{entry[3]}</p>
            <br></br>
          </>
        ))}
      </SmoothDisplayContainer>
    </AppScreen>
  );
}

const MainContainer = styled.div<{ compactMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${({ compactMode }) => (compactMode ? 7 * GU : 23 * GU)}px;
  width: 100%;
  height: 100%;
`;

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;

  switch (caught.status) {
    case 400:
      message = caught.data;
    case 500:
      message = caught.data;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div>
      <div>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </div>
    </div>
  );
}
