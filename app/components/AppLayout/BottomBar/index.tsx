import { GU, useTheme, useViewport } from "@1hive/1hive-ui";
import { a } from "@react-spring/web";
import styled from "styled-components";
import { useAppReady } from "~/providers/AppReady";

export const BottomBar = () => {
  const { below } = useViewport();
  const theme = useTheme();
  const { appReadyTransition } = useAppReady();
  const compactMode = below("large");

  return (
    <Container>
      {appReadyTransition(
        ({ progress, bottomBarTransform }, ready) =>
          ready && (
            <AnimatedContainer
              style={{ opacity: progress, transform: bottomBarTransform }}
              $compactMode={compactMode}
            >
              {/* <div style={{ color: theme.surfaceContent }}>
                <span style={{ opacity: 0.4 }}></span>&copy; Copyright 2022,
                Gardens - Metrics
              </div> */}
            </AnimatedContainer>
          )
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: ${9 * GU}px;
`;

const AnimatedContainer = styled(a.div)<{ $compactMode: boolean }>`
  display: flex;
  z-index: 1;
  padding: 0 ${7 * GU}px;

  justify-content: ${({ $compactMode }) =>
    $compactMode ? "center" : "flex-start"};
`;
