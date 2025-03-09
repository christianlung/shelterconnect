'use client';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { PropsWithChildren, useCallback, useRef } from 'react';

interface PinnedBottomSheetProps {}

/**
 * A bottom sheet that remains open on the screen.
 * Will snap close to the bottom of the screen without closing.
 */
const PinnedBottomSheet: React.FC<PinnedBottomSheetProps> = (
  props: PropsWithChildren<PinnedBottomSheetProps>,
) => {
  const { children } = props;
  const sheetRef = useRef<SheetRef>(null);
  const onClose = useCallback(() => {
    sheetRef.current?.snapTo(snapPoints.length - 1);
  }, []);

  return (
    <Sheet
      ref={sheetRef}
      isOpen
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

const snapPoints = [0.9, 0.1];

export default PinnedBottomSheet;
