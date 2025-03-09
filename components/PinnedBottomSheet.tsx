'use client';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { PropsWithChildren, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
      initialSnap={initialSnap}
      style={{ zIndex: 40 }}
    >
      <Sheet.Container>
        <Sheet.Header className="bg-white shadow-sm">
          <Sheet.Content>
            <Sheet.Scroller>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Header>
      </Sheet.Container>
    </Sheet>
  );
};

const snapPoints = [0.9, 0.1];
const initialSnap = 1;

export default PinnedBottomSheet;
